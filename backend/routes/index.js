


import mongoose from "mongoose";
import { authMiddleware,adminMiddleware } from "../middleware.js";
import express from "express";


import  { accountRouter } from "./account.js"
import  { userRouter } from "./user.js"
import  adminRouter  from "./admin.js"
import  { transactionRouter } from "./transaction.js"



const router = express.Router();

router.use("/user",userRouter);
router.use("/account",accountRouter);
router.use("/transaction",transactionRouter);
router.use("/admin",adminRouter);
/*
const transactionRouter = express.Router();

transactionRouter.post("/send", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await Transaction.create([{
        sender: req.userId,
        receiver: to,
        amount: amount
    }], { session });

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});


transactionRouter.get("/", authMiddleware, async (req, res) => {
    const transactions = await Transaction.find({
        $or: [
            { sender: req.userId },
            { receiver: req.userId }
        ]
    }).populate('sender', 'username')
      .populate('receiver', 'username');

    res.json(transactions);
});

router.use("/transactions", transactionRouter);
*/

export default router