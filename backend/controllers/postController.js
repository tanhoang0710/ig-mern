const multer = require('multer');
const sharp = require('sharp');
const Follow = require('../models/followModel');
const Post = require('../models/postModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    console.log('🚀 ~ file: postController.js:8 ~ multerFilter ~ file:', file);
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.multerConfig = upload.array('images');

exports.resizeImages = async (req, res, next) => {
    const { user } = req;
    console.log(
        '🚀 ~ file: postController.js:20 ~ exports.resizeImages= ~ req.user:',
        req.user
    );
    if (!user)
        return res.status(404).json({
            status: 'fail',
            message: 'No user found with that ID!',
        });
    // if (!req.files) return next();
    console.log(req.files);
    req.body.images = [];
    await Promise.all(
        req.files.map(async (file, i) => {
            const filename = `post-${req.user._id}-${
                file.originalname.split('.')[0]
            }-${Date.now()}-${i + 1}.jpeg`;

            await sharp(file.buffer)
                .resize(900, 676)
                .toFormat('jpeg')
                .jpeg({ quality: 90 })
                .toFile(`public/img/posts/${filename}`);

            req.body.images.push(filename);
        })
    );
    console.log(req.body.images);
    next();
};

exports.uploadPost = async (req, res) => {
    const { user } = req;
    const body = JSON.parse(JSON.stringify(req.body));
    const { images, caption, liked_by } = body;
    const data = await Post.create({
        images,
        caption,
        user: user._id,
        liked_by: liked_by ? liked_by : undefined,
    });
    if (data)
        return res.status(201).json({
            status: 'success',
            data,
        });
    return res.status(500).json({
        status: 'fail',
        message: 'Some thing went wrong!',
    });
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post)
        return res.status(404).json({
            status: 'fail',
            message: 'No post found with that ID',
        });
    await Post.findByIdAndUpdate(id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
// Get Posts tu acc ma minh da follow và sort theo thoi gian
exports.getPostFromFollowingUsers = async (req, res) => {
    const { page, limit } = req.query;
    const { _id } = req.user;

    const skip = (page - 1) * limit;
    const now = new Date(Date.now());
    console.log(
        '🚀 ~ file: storyController.js:170 ~ exports.getStories= ~ now:',
        now
    );
    // Lấy ra những người mà mình follow
    const listFollowing = await Follow.find({
        follower: _id,
    });

    const listFollowingID = listFollowing.map((ele) => ele.followee);
    // Lấy ra 10 posts chưa expired và thuộc những người mình follow
    const posts = await Post.find({
        active: { $ne: false },
        user: { $in: listFollowingID },
    })
        .skip(skip)
        .limit(limit)
        .populate('user', 'username avatar')
        .select('createdAt')
        .sort({
            createdAt: -1,
        });

    res.status(200).json({
        status: 'success',
        posts,
    });
};

exports.likeAPost = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post)
        return res.status(404).json({
            status: 'fail',
            message: 'No post found with that ID!',
        });
    post.liked_by = [...post.liked_by, _id];
    try {
        await post.save({
            validateBeforeSave: false,
        });
        return res.status(200).json({
            status: 'success',
            message: 'Like a post successfully!',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.getLikesOfAPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id)
            .populate('liked_by', 'username')
            .populate('user', 'username avatar')
            .select('-user -images -caption');
        const total = post.liked_by.length;
        const { liked_by } = post;
        if (!post)
            return res.status(404).json({
                status: 'fail',
                message: 'No post found with that ID!',
            });
        return res.status(200).json({
            status: 'success',
            liked_by,
            total,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.unlikePost = async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post)
        return res.status(404).json({
            status: 'fail',
            message: 'No post found with that ID!',
        });
    post.liked_by = post.liked_by.filter((item) => !item.equals(_id));
    try {
        await post.save({
            validateBeforeSave: false,
        });
        return res.status(200).json({
            status: 'success',
            message: 'Unlike a post successfully!',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};
