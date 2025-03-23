const { Schema, model } = require('mongoose');

const walletSchema = new Schema({
    name: String,
    balance: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
});

const Wallet = model('Wallet', walletSchema);

module.exports = Wallet;