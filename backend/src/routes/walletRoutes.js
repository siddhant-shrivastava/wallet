const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { validationResult } = require('express-validator');
const {
    validateInitializeWallet,
    validateGetWalletDetails
} = require('../middleware/walletValidation');
const {
    validateTransact,
    validateGetTransactions
} = require('../middleware/transactionValidation');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/setup', validateInitializeWallet, validate, walletController.initializeWallet);
router.post('/transact/:walletId', validateTransact, validate, walletController.transact);
router.get('/transactions', validateGetTransactions, validate, walletController.fetchTransactions);
router.get('/wallet/:id', validateGetWalletDetails, validate, walletController.getWalletDetails);

module.exports = router;