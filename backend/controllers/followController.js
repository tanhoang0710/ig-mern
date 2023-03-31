const Follow = require('../models/followModel');
const User = require('../models/userModel');

exports.followAUser = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};
exports.unfollowAUser = async (req, res) => {
    try {
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
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.checkFollow = async (req, res) => {
    try {
        const { user } = req;
        const { otherUserId } = req.params;
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
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.getAllFollow = async (req, res) => {
    try {
        const { type } = req.query;
        const { user } = req;
        const { otherUserId } = req.params;
        const id = otherUserId ? otherUserId : user._id;
        if (type === 'followers') {
            const followers = await Follow.find({ followee: id })
                .populate('follower')
                .select('-followee -__v');
            let checkFollow = {};
            if (otherUserId) {
                const checkFollowWithUser = [];
                await Promise.all(
                    followers.map(async (follower) => {
                        const isOtherUserFollow = await Follow.findOne({
                            followee: user._id,
                            follower: follower.toObject().follower._id,
                        });

                        const isMeFollow = await Follow.findOne({
                            followee: follower.toObject().follower._id,
                            follower: user._id,
                        });
                        if (isOtherUserFollow && isMeFollow) {
                            checkFollow = {
                                following: true,
                                followed: true,
                                followEachOther: true,
                            };
                        } else if (isOtherUserFollow) {
                            checkFollow = {
                                following: false,
                                followed: true,
                                followEachOther: false,
                            };
                        } else if (isMeFollow) {
                            checkFollow = {
                                following: true,
                                followed: false,
                                followEachOther: false,
                            };
                        } else {
                            checkFollow = {
                                following: false,
                                followed: false,
                                followEachOther: false,
                            };
                        }
                        checkFollowWithUser.push({
                            ...follower.toObject(),
                            ...checkFollow,
                        });
                    })
                );
                return res.status(200).json({
                    status: 'success',
                    followers: checkFollowWithUser,
                });
            }
            return res.status(200).json({
                status: 'success',
                followers,
            });
        }
        const followees = await Follow.find({ follower: id })
            .populate('followee')
            .select('-follower -__v');
        let checkFollow = {};
        if (otherUserId) {
            const checkFollowWithUser = [];
            await Promise.all(
                followees.map(async (followee) => {
                    const isOtherUserFollow = await Follow.findOne({
                        followee: user._id,
                        follower: followee.toObject().followee._id,
                    });

                    const isMeFollow = await Follow.findOne({
                        followee: followee.toObject().followee._id,
                        follower: user._id,
                    });
                    if (isOtherUserFollow && isMeFollow) {
                        checkFollow = {
                            following: true,
                            followed: true,
                            followEachOther: true,
                        };
                    } else if (isOtherUserFollow) {
                        checkFollow = {
                            following: false,
                            followed: true,
                            followEachOther: false,
                        };
                    } else if (isMeFollow) {
                        checkFollow = {
                            following: true,
                            followed: false,
                            followEachOther: false,
                        };
                    } else {
                        checkFollow = {
                            following: false,
                            followed: false,
                            followEachOther: false,
                        };
                    }
                    checkFollowWithUser.push({
                        ...followee.toObject(),
                        ...checkFollow,
                    });
                })
            );
            return res.status(200).json({
                status: 'success',
                followees: checkFollowWithUser,
            });
        }
        return res.status(200).json({
            status: 'success',
            followees,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};
