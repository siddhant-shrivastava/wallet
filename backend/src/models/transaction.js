const { Schema, Types, model } = require('mongoose');
const { ObjectId } = Types;

const transactionSchema = new Schema({
    walletId: { type: ObjectId, ref: 'Wallet', required: true },
    amount: Number,
    balance: Number,
    description: String,
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['CREDIT', 'DEBIT'], required: true },
});

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;