const mongoose = require('mongoose');

const followSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A follow must belong to a user'],
        },
        followee: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A follow must belong to a user'],
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

const Follow = mongoose.model('Follow', followSchema);
module.exports = Follow;
