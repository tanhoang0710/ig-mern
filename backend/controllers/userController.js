const Users = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({})
    res.status(200).json({
        status: 'success',
        data: {
            users,
        },
    });
  } catch (error) {
    console.log(error)
  }
}