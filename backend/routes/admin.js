// routes/adminRoutes.js





import express from "express";
import { authMiddleware,adminMiddleware } from "../middleware.js";
import userModel from "../models/usermodel.js";
import TransactionModel from "../models/transactionmodel.js";
import AccountModel from "../models/accountmodel.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await userModel.find({ isAdmin: false }, "-password");

        // Fetch balances for each user
        const usersWithBalance = await Promise.all(
            users.map(async (user) => {
                const account = await AccountModel.findOne({ userId: user._id });
                return {
                    ...user.toObject(),
                    balance: account ? account.balance : 0
                };
            })
        );

        res.status(200).json({ users: usersWithBalance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
})

/*get all the users from a DB ,  */
adminRouter.get("/user/:id", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userModel.findById(id, "-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const account = await AccountModel.findOne({ userId: id });
        const transactions = await TransactionModel.find({
            $or: [{ senderId: id }, { receiverId: id }]
        })
            .populate("senderId", "username firstName lastName")
            .populate("receiverId", "username firstName lastName")
            .sort({ createdAt: -1 });

        res.status(200).json({
            user: {
                ...user.toObject(),
                balance: account ? account.balance : 0
            },
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error: error.message });
    }
});



adminRouter.get("/transactions", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const transactions = await TransactionModel.find()
            .populate("senderId", "username firstName lastName")
            .populate("receiverId", "username firstName lastName")
            .sort({ createdAt: -1 });

        res.status(200).json({ transactions });
    } catch (error) {
        res.status(500).json({ message: "Error fetching transactions", error: error.message });
    }
});

adminRouter.get("/transactions/suspicious" ,adminMiddleware,authMiddleware,async  (req,res)=> {

    try {
        const suspicious = await TransactionModel.find({ amount: { $gt: 50000 } }).populate("from to", "username");
        res.status(200).json({ suspicious });
    } catch (error) {
        res.status(500).json({ message: "Error fetching suspicious transactions", error: error.message });
    }
})

export default adminRouter