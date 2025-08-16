// get the qr code from the backend

import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware.js";
import userModel from "../models/usermodel.js";
import AccountModel from "../models/accountmodel.js";
import TransactionModel from "../models/transactionmodel.js";


const router = express.Router();


async function decodeQrCode(imageSource) {
    let buffer;

    if (imageSource.startsWith("data:image")) {
        // Base64 QR
        buffer = Buffer.from(imageSource.split(",")[1], "base64");
    } else {
        // Image URL, fetch it
        const response = await axios.get(imageSource, { responseType: "arraybuffer" });
        buffer = Buffer.from(response.data, "binary");
    }

    const image = await Jimp.read(buffer);

    return new Promise((resolve, reject) => {
        const qr = new QrCode();
        qr.callback = (err, value) => {
            if (err) return reject(err);
            resolve(value.result); // This is the embedded qrData (JSON)
        };
        qr.decode(image.bitmap);
    });
}
router.get("/me",authMiddleware, async (req,res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ qrCode: user.qrCodeId, 
            username: user.username ,
            firstName: user.firstName,
            lastName: user.lastName,
            profileurl: user.profileurl,
            qrData:user.qrData,
            id:user._id
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching QR", error: err.message });
    }
})

// PAY via QR code
router.post("/pay", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { qrData, amount } = req.body;
    const parsed = JSON.parse(qrData);   // { qrCodeId: "..." }
    const receiver = await userModel.findOne({ qrCodeId: parsed.qrCodeId }).session(session);

    if (!receiver) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Receiver not found" });
    }

    const senderId = new mongoose.Types.ObjectId(req.userId);
    const receiverId = receiver._id;

    const senderAccount = await AccountModel.findOne({userId:senderId}).session(session);
    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient funds" });
    }


    const receiverAccount = await AccountModel.findOne({ userId: receiverId }).session(session);
    if (!receiverAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid receiver account" });
    }

    // ✅ Update balances
    await AccountModel.updateOne(
      { userId: senderId },
      { $inc: { balance: -amount } },
      { session }
    );

    await AccountModel.updateOne(
      { userId: receiverId },
      { $inc: { balance: amount } },
      { session }
    );

    // ✅ Record transaction
    await TransactionModel.create([{
      senderId,
      receiverId,
      amount,
      status: "success",
      type: "QR Payment",
      createdAt: new Date()
    }], { session });


     // ✅ Commit changes
     await session.commitTransaction();

     const updatedSender = await AccountModel.findOne({ userId: senderId });
     const updatedReceiver = await AccountModel.findOne({ userId: receiverId });
 
     res.json({
       message: "QR Payment successful",
       senderBalance: updatedSender.balance,
       receiverBalance: updatedReceiver.balance
     });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ message: "Payment failed", error: err.message });
  } finally {
    session.endSession();
  }
});



export const QrRouter = router