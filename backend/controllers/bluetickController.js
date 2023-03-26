const Bluetick = require('../models/bluetickModel');

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
        res.status(400).json({
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
        res.status(400).json({
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
        (bluetick.verified = true), (bluetick.status = 'accepted');
        await bluetick.save();
        res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        res.status(400).json({
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
        bluetick.verified = false;
        bluetick.status = 'not-accepted';
        await bluetick.save();
        res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        res.status(400).json({
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
        (bluetick.verified = false), (bluetick.status = 'removed');
        await bluetick.save();
        res.status(200).json({
            message: 'success',
            bluetick,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
