// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account } = require('../db');
// const mongoose = require("mongoose");


import express from 'express';
import { authMiddleware } from '../middleware.js';
import AccountModel from '../models/accountmodel.js';
import mongoose from 'mongoose';
import TransactionModel from '../models/transactionmodel.js';
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await AccountModel.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;


        const senderId = new mongoose.Types.ObjectId(req.userId);
        const receiverId = new mongoose.Types.ObjectId(to);

        const account = await AccountModel.findOne({ userId: req.userId }).session(session);
        console.log("Sender account before:", account)
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await AccountModel.findOne({ userId: to }).session(session);
        console.log("Recipient account before:", toAccount);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        // Update balances
        await AccountModel.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        await AccountModel.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        );

        // Record transaction
        await TransactionModel.create([{
            senderId: req.userId,   // make sure this matches schema
            receiverId: to,         // make sure this matches schema
            amount,
            status: "success"
        }], { session });

        await session.commitTransaction();
        console.log("✅ Transfer committed");

        const updatedSender = await AccountModel.findOne({ userId: senderId });
        const updatedReceiver = await AccountModel.findOne({ userId: receiverId });

        console.log("Sender account after:", updatedSender);
        console.log("Recipient account after:", updatedReceiver);

        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Transfer failed", error: error.message });
    } finally {
        session.endSession();
    }
});

export const accountRouter = router;