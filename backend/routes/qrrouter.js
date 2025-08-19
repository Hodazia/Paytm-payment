// get the qr code from the backend

import express from "express";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware.js";
import userModel from "../models/usermodel.js";
import AccountModel from "../models/accountmodel.js";
import TransactionModel from "../models/transactionmodel.js";
import QrCode from "qrcode-reader"
import axios from "axios";
import  { Jimp } from "jimp"


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

    
    await TransactionModel.create([{
      senderId,
      receiverId,
      amount,
      status: "success",
      type: "QR Payment",
      createdAt: new Date()
    }], { session });


    
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

// add a /decode api , to uploaded QR image 
// (base64 or URL) and returns the decoded JSON (with qrCodeId).
router.post("/decode", async (req, res) => {
  try {
    const { imageSource } = req.body;
    if (!imageSource) return res.status(400).json({ success: false, message: "imageSource required" });

    let buffer;
    if (imageSource.startsWith("data:image/")) {
      const base64 = imageSource.split(",")[1];
      if (!base64) return res.status(400).json({ success: false, message: "Invalid base64 image" });
      buffer = Buffer.from(base64, "base64");
    } else {
      const response = await axios.get(imageSource, { responseType: "arraybuffer" });
      buffer = Buffer.from(response.data);
    }

    const image = await Jimp.read(buffer);

    const qrText = await new Promise((resolve, reject) => {
      try {
        const qr = new QrCode();
        qr.callback = (err, value) => {
          if (err) return reject(err);
          resolve(value?.result || "");
        };
        qr.decode(image.bitmap);
      } catch (e) {
        reject(e);
      }
    });

    if (!qrText) return res.status(422).json({ success: false, message: "No QR detected" });

    // Accept JSON or plain string
    let qrCodeId = null;
    try {
      const parsed = JSON.parse(qrText);
      qrCodeId = parsed?.qrCodeId || null;
    } catch {
      qrCodeId = qrText?.trim() || null;
    }

    if (!qrCodeId) return res.status(422).json({ success: false, message: "QR not in expected format" });

    res.json({ success: true, qrCodeId });
  } catch (err) {
    console.error("QR decode error:", err?.message);
    res.status(500).json({ success: false, message: "Failed to decode QR" });
  }
});


// Resolve QR -> return user info
/**
 Expected Output like this,
 {
    "_id": "68a0a1342d6b365c5ed009ca",
    "username": "zia24hoda@gmail.com",
    "firstName": "ZIAUL",
    "lastName": "HODA",
    "profileurl": "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma28755f85"
}
    
 */
router.post("/resolve", authMiddleware, async (req, res) => {
  try {
    const { qrData } = req.body;
    if (!qrData) return res.status(400).json({ message: "QR data required" });

    const parsed = JSON.parse(qrData); // { qrCodeId: "..." }
    const user = await userModel.findOne({ qrCodeId: parsed.qrCodeId }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      profileurl: user.profileurl
    });
  } catch (err) {
    res.status(500).json({ message: "Error resolving QR", error: err.message });
  }
});

export const QrRouter = router