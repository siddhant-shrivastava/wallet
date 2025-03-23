const mongoose = require('mongoose');
const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

const initializeWallet = async (req, res) => {
    try {
        const { balance, name } = req.body;
        const initialBalance = parseFloat(balance).toFixed(4);
        const newWallet = new Wallet({ name, balance: initialBalance });
        const savedWallet = await newWallet.save();

        const initialTransaction = new Transaction({
            walletId: savedWallet._id,
            amount: initialBalance,
            balance: initialBalance,
            description: 'Wallet Setup',
            type: 'CREDIT',
        });
        const savedTransaction = await initialTransaction.save();

        res.status(200).json({
            id: savedWallet._id,
            balance: savedWallet.balance,
            transactionId: savedTransaction._id,
            name: savedWallet.name,
            date: savedWallet.date,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to initialize wallet' });
    }
};

const transact = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { walletId } = req.params;
        const { amount: amountStr, description } = req.body;
        const amount = parseFloat(amountStr);

        const wallet = await Wallet.findById(walletId).session(session);

        if (!wallet) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ error: 'Wallet not found' });
        }

        const currentBalance = parseFloat(wallet.balance);
        const newBalance = (currentBalance + amount).toFixed(4); // Format to string

        if (amount < 0 && parseFloat(newBalance) < 0) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const updatedWallet = await Wallet.findByIdAndUpdate(
            walletId,
            { balance: newBalance }, // Update with the string balance
            { new: true, session }
        );

        const transactionType = amount >= 0 ? 'CREDIT' : 'DEBIT';

        const newTransaction = new Transaction({
            walletId,
            amount: amount.toFixed(4),
            balance: updatedWallet.balance,
            description,
            type: transactionType,
        });
        await newTransaction.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ balance: updatedWallet.balance, transactionId: newTransaction._id });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error processing transaction:', error);
        res.status(500).json({ error: 'Failed to process transaction' });
    }
};

const fetchTransactions = async (req, res) => {
    try {
        const { walletId, skip = 0, limit = 10 } = req.query;
        const transactions = await Transaction.find({ walletId })
            .sort({ date: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const totalCount = await Transaction.countDocuments({ walletId });

        res.status(200).json({ transactions, totalCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

const getWalletDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const wallet = await Wallet.findById(id);
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }
        res.status(200).json({ id: wallet._id, balance: wallet.balance, name: wallet.name, date: wallet.date });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch wallet details' });
    }
};

module.exports = {
    initializeWallet,
    transact,
    fetchTransactions,
    getWalletDetails,
};