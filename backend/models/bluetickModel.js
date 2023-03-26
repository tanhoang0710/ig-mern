const mongoose = require('mongoose');

const bluetickSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A bluetick must belong to a user'],
        },
        status: String,
        verified: Boolean,
    },
    {
        timestamps: true,
    }
);

const Bluetick = mongoose.model('Bluetick', bluetickSchema);
module.exports = Bluetick;
