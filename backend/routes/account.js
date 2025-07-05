const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

router.post("/transfer", authMiddleware, async (req, res) => {
    console.log("=== TRANSFER REQUEST DEBUG ===");
    console.log("Request body:", req.body);
    console.log("User ID:", req.userId);
    console.log("Amount:", req.body.amount);
    console.log("To:", req.body.to);
    
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    console.log("From account:", account);

    if (!account || account.balance < amount) {
        console.log("Insufficient balance or account not found");
        console.log("Account balance:", account?.balance);
        console.log("Requested amount:", amount);
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    console.log("To account:", toAccount);

    if (!toAccount) {
        console.log("Invalid recipient account");
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    console.log("Performing transfer...");
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    console.log("Transfer completed successfully");

    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;