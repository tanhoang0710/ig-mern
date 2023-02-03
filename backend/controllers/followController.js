const Follow = require('../models/followModel');
const User = require('../models/userModel');

exports.followAUser = async (req, res) => {
    const { user } = req;
    const { otherUserId } = req.params;
    const otherUser = await User.findById(otherUserId);
    if (otherUser) {
        await Follow.create({
            follower: user._id,
            followee: otherUser._id,
        });
        return res.status(200).json({
            status: 'success',
        });
    }
    return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID!',
    });
};
exports.unfollowAUser = async (req, res) => {
    const { user } = req;
    const { otherUserId } = req.params;
    const otherUser = await User.findById(otherUserId);
    if (otherUser) {
        await Follow.deleteOne({
            follower: user._id,
            followee: otherUser._id,
        });
        return res.status(200).json({
            status: 'success',
        });
    }
    return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID!',
    });
};

exports.getAllFollow = async (req, res) => {
    const { type } = req.query;
    const { user } = req;
    if (type === 'follower') {
        const followers = await Follow.find({ followee: user._id })
            .populate('follower')
            .select('-followee -__v');
        return res.status(200).json({
            status: 'success',
            followers,
        });
    }
    const followees = await Follow.find({ follower: user._id })
        .populate('followee')
        .select('-follower -__v');
    return res.status(200).json({
        status: 'success',
        followees,
    });
};
