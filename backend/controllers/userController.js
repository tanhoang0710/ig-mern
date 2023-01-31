const Users = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
    console.log(
        '🚀 ~ file: userController.js:4 ~ exports.getAllUsers= ~ req',
        req.user
    );
    try {
        const users = await Users.find({});
        res.status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
