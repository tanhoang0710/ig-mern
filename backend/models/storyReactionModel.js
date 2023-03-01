const mongoose = require('mongoose');

const storyReactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A post must belong to a user'],
    },
    story: {
        type: mongoose.Schema.ObjectId,
        ref: 'Story',
        required: [true, 'A story view must belong to a story'],
    },
    type: {
        type: String,
        required: [true, 'A reaction must have a type'],
        enum: {
            // enum chi dung voi string
            values: ['like', 'love', 'care', 'haha', 'wow', 'sad', 'angry'],
            message:
                'Difficulty is either: like, love, care, haha, wow, sad, angry!',
        },
    },
});

const StoryReaction = mongoose.model('StoryReaction', storyReactionSchema);

module.exports = StoryReaction;
