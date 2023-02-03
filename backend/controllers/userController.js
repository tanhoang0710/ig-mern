const Users = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
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

exports.getAUser = async (req, res) => {
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user)
        return res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    return res.status(404).json({
        status: 'fail',
        message: "Can't find a user with that ID!",
    });
};
