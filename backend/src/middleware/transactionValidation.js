const { param, body, query } = require('express-validator');

exports.validateTransact = [
    param('walletId').isMongoId().withMessage('Invalid walletId, It should be a MongoId.'),
    body('amount').notEmpty().isNumeric().withMessage('Amount must not be empty, must be a number.'),
    body('description').isString().optional(),
];

exports.validateGetTransactions = [
    query('walletId').isMongoId().withMessage('Invalid walletId, It should be a MongoId.'),
    query('skip').optional().isInt({ min: 0 }).withMessage('Skip must be a positive number.'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be a positive number (max 100).'),
];