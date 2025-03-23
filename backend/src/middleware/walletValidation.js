const { body, param } = require('express-validator');

exports.validateInitializeWallet = [
    body('balance').notEmpty().isNumeric().withMessage('Balance must not be empty, must be a number.'),
    body('name').notEmpty().isString().withMessage('Name must not be empty, must be a string.'),
];

exports.validateGetWalletDetails = [
    param('id').isMongoId().withMessage('Invalid wallet ID, It should be a MongoId.'),
];