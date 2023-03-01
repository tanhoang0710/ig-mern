const multer = require('multer');
const sharp = require('sharp');
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
