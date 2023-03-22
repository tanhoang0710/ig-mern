const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

exports.getCommentOfAPost = async (req, res) => {
    const { id } = req.params;

    const page = +req.query.page;
    const limit = +req.query.limit;
    const skip = (page - 1) * limit;
    try {
        const data = await Comment.aggregate([
            {
                $match: {
                    post: mongoose.Types.ObjectId(id),
                    parentID: null,
                },
            },
            {
                $facet: {
                    total: [
                        {
                            $count: 'total',
                        },
                    ],
                    comments: [
                        {
                            $skip: skip,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                },
            },
        ]);
        const totalPages = Math.ceil(data[0].total[0].total / limit);
        return res.status(200).json({
            status: 'success',
            total: data[0].total[0].total,
            totalPages,
            comment: data[0].comments,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.createAComment = async (req, res) => {
    const { _id } = req.user;

    const { content, postId } = req.body;

    let parentID;

    if (!req.body.parentID) parentID = null;
    else parentID = req.body.parentID;
    try {
        const comment = await Comment.create({
            content,
            user: _id,
            parentID,
            post: postId,
        });
        return res.status(201).json({
            status: 'success',
            comment,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Get reply comments pageable
exports.getReplyComment = async (req, res) => {
    const { id } = req.params;

    const page = +req.query.page;
    const limit = +req.query.limit;
    const skip = (page - 1) * limit;
    try {
        const data = await Comment.aggregate([
            {
                $match: {
                    parentID: mongoose.Types.ObjectId(id),
                },
            },
            {
                $facet: {
                    total: [
                        {
                            $count: 'total',
                        },
                    ],
                    comments: [
                        {
                            $skip: skip,
                        },
                        {
                            $limit: limit,
                        },
                    ],
                },
            },
        ]);
        const totalPages = Math.ceil(data[0].total[0].total / limit);
        return res.status(200).json({
            status: 'success',
            total: data[0].total[0].total,
            totalPages,
            comment: data[0].comments,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// like comment
exports.likeAComment = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    try {
        const comment = await Comment.findById(id);
        if (!comment)
            return res.status(404).json({
                status: 'fail',
                message: 'No comment found with that ID!',
            });
        comment.liked_by = [...comment.liked_by, _id];
        await comment.save({
            validateBeforeSave: false,
        });
        return res.status(200).json({
            status: 'success',
            comment,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// unlike comment
exports.unlikeAComment = async (req, res) => {
    const { id } = req.params;
    const { _id } = req.user;
    try {
        const comment = await Comment.findById(id);
        if (!comment)
            return res.status(404).json({
                status: 'fail',
                message: 'No comment found with that ID!',
            });
        comment.liked_by = comment.liked_by.filter(
            (userID) => !userID.equals(_id)
        );
        await comment.save({
            validateBeforeSave: false,
        });
        return res.status(200).json({
            status: 'success',
            comment,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
// delete comment
// sua comment
