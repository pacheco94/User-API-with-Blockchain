// Serialize user data for blockchain storage

const serializeUser = (user) => {
    return {
        id:user.toString(),
        name: user.name,
        email: user.email,
        addressWallet: user.addressWallet
    };
};

 module.exports = serializeUser;