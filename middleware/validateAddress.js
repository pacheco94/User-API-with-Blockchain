/**
 * Middleware to validate address data
 */

const ethers = require('ethers');

const validateAddress = (req, res, next) => {
    const { addressWallet } = req.body;
    if (!addressWallet) {
        return res.status(400).json({ error: 'The addressWallet field is missing' });
    };

    if(!ethers.isAddress(addressWallet)) {
        return res.status(400).json({ error: 'Ethereum address not valid!'});
    };

    next();
};

module.exports = validateAddress;