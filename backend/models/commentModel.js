const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'A comment must belong to a user'],
        },
        post: {
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
            required: [true, 'A comment must belong to a post'],
        },
        content: String,
        liked_by: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
            },
        ],
        parentID: {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment',
        },
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
