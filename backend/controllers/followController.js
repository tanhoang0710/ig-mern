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

exports.checkFollow = async (req, res) => {
    const { user } = req;
    console.log(
        '🚀 ~ file: followController.js:43 ~ exports.checkFollow= ~ user',
        user._id
    );
    const { otherUserId } = req.params;
    console.log(
        '🚀 ~ file: followController.js:45 ~ exports.checkFollow= ~ otherUserId',
        otherUserId
    );
    const isOtherUserFollow = await Follow.findOne({
        followee: user._id,
        follower: otherUserId,
    });

    const isMeFollow = await Follow.findOne({
        follower: user._id,
        followee: otherUserId,
    });
    if (isOtherUserFollow && isMeFollow) {
        return res.status(200).json({
            following: true,
            followed: true,
            followEachOther: true,
        });
    } else if (isOtherUserFollow) {
        return res.status(200).json({
            following: false,
            followed: true,
            followEachOther: false,
        });
    } else if (isMeFollow) {
        return res.status(200).json({
            following: true,
            followed: false,
            followEachOther: false,
        });
    } else {
        return res.status(200).json({
            following: false,
            followed: false,
            followEachOther: false,
        });
    }
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
