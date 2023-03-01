const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A story must belong to a user'],
    },
    image: String,
    music: {
        type: mongoose.Schema.ObjectId,
        ref: 'Music',
    },
    active: Boolean,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    expiredIn: {
        type: Date,
        default: new Date(Date.now() + 3600 * 1000 * 24),
    },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
