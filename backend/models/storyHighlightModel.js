const mongoose = require('mongoose');

const storyHighlight = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A story highlight must belong to a user'],
    },
    title: {
        type: String,
        required: [true, 'A story highlight must belong to a story'],
    },
    stories: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Story',
        },
    ],
    cover: {
        type: mongoose.Schema.ObjectId,
        ref: 'Story',
    },
    active: Boolean,
});

const StoryHighlight = mongoose.model('StoryHighlight', storyHighlight);

module.exports = StoryHighlight;
