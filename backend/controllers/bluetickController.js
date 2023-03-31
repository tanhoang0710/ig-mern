const Bluetick = require('../models/bluetickModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');

exports.getAllRequest = async (req, res) => {
    try {
        const blueticks = await Bluetick.find({
            status: 'requested',
        });
        return res.status(201).json({
            status: 'success',
            blueticks,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.requestBlueTick = async (req, res) => {
    const { _id } = req.user;
    try {
        const bluetick = await Bluetick.create({
            user: _id,
            status: 'requested',
            verified: false,
        });
        return res.status(201).json({
            status: 'success',
            bluetick,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.verifyBluetick = async (req, res) => {
    const { id } = req.params;
    try {
        const bluetick = await Bluetick.findById(id);
        if (!bluetick) {
            return res.status(404).json({
                status: 'fail',
                message: 'There is no bluetick request with that ID!',
            });
        }
        const user = await User.findById(bluetick.user);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No users found or has been deleted!',
            });
        }
        (bluetick.verified = true), (bluetick.status = 'accepted');
        await bluetick.save();
        await sendEmail({
            email: user.email,
            subject: 'Bluetick accepted',
            message: `Dear ${user.fullname}, your account has been reviewed and accepted for bluetick.\n\nThank you for using my app.\n\ntanhun`,
        });
        return res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.rejectBluetick = async (req, res) => {
    const { id } = req.params;
    try {
        const bluetick = await Bluetick.findById(id);
        if (!bluetick) {
            return res.status(404).json({
                status: 'fail',
                message: 'There is no bluetick request with that ID!',
            });
        }
        const user = await User.findById(bluetick.user);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No users found or has been deleted!',
            });
        }
        bluetick.verified = false;
        bluetick.status = 'not-accepted';
        await bluetick.save();
        await sendEmail({
            email: user.email,
            subject: 'Bluetick rejected',
            message: `Dear ${user.fullname}, your account has been reviewed and seem to be not accepted for bluetick.\n\nThank you for using my app.\n\ntanhun`,
        });
        return res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.removeBluetick = async (req, res) => {
    const { id } = req.params;
    try {
        const bluetick = await Bluetick.findById(id);
        if (!bluetick) {
            return res.status(404).json({
                status: 'fail',
                message: 'There is no bluetick request with that ID!',
            });
        }
        const user = await User.findById(bluetick.user);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No users found or has been deleted!',
            });
        }
        if (!bluetick.verified) {
            return res.status(403).json({
                status: 'fail',
                message: "Your account isn't has bluetick",
            });
        }
        (bluetick.verified = false), (bluetick.status = 'removed');
        await bluetick.save();
        await sendEmail({
            email: user.email,
            subject: 'Bluetick removed',
            message: `Dear ${user.fullname}, your account has been reviewed and it seems that your account is in violation of our terms. So we're temporary removed your bluetick.\n\nThank you for using my app.\n\ntanhun`,
        });
        return res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
