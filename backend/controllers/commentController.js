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

    if (!req.parentID) parentID = null;
    else parentID = req.parentID;
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
