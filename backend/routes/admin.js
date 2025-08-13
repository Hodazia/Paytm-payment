// routes/adminRoutes.js





import express from "express";
import { authMiddleware,adminMiddleware } from "../middleware.js";
import userModel from "../models/usermodel.js";
import TransactionModel from "../models/transactionmodel.js";

const adminRouter = express.Router();

/*get all the users from a DB ,  */
adminRouter.get("/users",authMiddleware,adminMiddleware,async (req,res) => {
    try {
        const users = await userModel.find({}, "-password");
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }

})


adminRouter.get("/transactions/suspicious" ,adminMiddleware,authMiddleware,async  (req,res)=> {

    try {
        const suspicious = await TransactionModel.find({ amount: { $gt: 50000 } }).populate("from to", "username");
        res.status(200).json({ suspicious });
    } catch (error) {
        res.status(500).json({ message: "Error fetching suspicious transactions", error: error.message });
    }
})

export default adminRouter