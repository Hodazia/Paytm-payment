


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
router.get("/history", authMiddleware, async (req, res) => {
    try {
      const userId = req.userId; // from authMiddleware
  
      // Query params with defaults
      const page = parseInt(req.query.page) || 1;  // default page = 1
      const limit = parseInt(req.query.limit) || 10; // default limit = 10
      const skip = (page - 1) * limit;
  
      // Query transactions
      const [transactions, total] = await Promise.all([
        TransactionModel.find({
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        })
          .populate("senderId", "username firstName lastName profileurl")
          .populate("receiverId", "username firstName lastName profileurl")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        TransactionModel.countDocuments({
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        })
      ]);
  
      res.status(200).json({
        transactions,
        pagination: {
          total,                     
          page,                      
          limit,                     
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error fetching transactions", 
        error: error.message 
      });
    }
  });

export const transactionRouter = router