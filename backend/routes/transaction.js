


import express from "express";
const router = express.Router();
import { authMiddleware } from "../middleware.js";
import AccountModel from "../models/accountmodel.js";
import TransactionModel from "../models/transactionmodel.js";
import mongoose from "mongoose";

router.post("/send", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await AccountModel.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await AccountModel.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await AccountModel.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await AccountModel.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await TransactionModel.create({
        sender: req.userId,
        receiver: to,
        amount: amount
    });

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


router.get("/", authMiddleware, async (req, res) => {
    const transactions = await TransactionModel.find({
        $or: [
            { sender: req.userId },
            { receiver: req.userId }
        ]
    }).populate('sender', 'username')
      .populate('receiver', 'username');

    res.json(transactions);
});


router.get("/history",authMiddleware, async (req,res) => {
    try {
        const userId = req.userId; // from authMiddleware

        // either u have sent the transaction or u have received it!
        const transactions = await TransactionModel.find({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ]
        })
        .populate("senderId", "username firstName lastName")
        .populate("receiverId", "username firstName lastName")
        .sort({ createdAt: -1 }); // latest first

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error: error.message });
    }
})


export const transactionRouter = router