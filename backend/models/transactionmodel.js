import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'success' },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const TransactionModel = mongoose.model('Transaction', transactionSchema);

export default TransactionModel