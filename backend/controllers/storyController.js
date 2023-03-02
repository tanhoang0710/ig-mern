const multer = require('multer');
const sharp = require('sharp');
const Music = require('../models/musicModel');
const Story = require('../models/storyModel');
const StoryReaction = require('../models/storyReactionModel');
const StoryViewer = require('../models/storyViewerModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only image.'), false);
    }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.multerConfig = upload.fields([{ name: 'image', maxCount: 1 }]);

exports.resizeImages = async (req, res, next) => {
    const { user } = req;
    if (!user)
        return res.status(404).json({
            status: 'fail',
            message: 'No user found with that ID!',
        });
    // if (!req.files) return next();
    console.log(req.files.image[0].originalname);
    // req.body.image = [];
    req.body.image = `storyImg-${req.user._id}-${Date.now()}-${
        req.files?.image[0]?.originalname.split('.')[0]
    }.jpeg`;
    await sharp(req?.files?.image[0]?.buffer)
        .resize(900, 676)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/stories/${req.body.image}`);

    // console.log(req.body.images);
    next();
};

exports.postAStory = async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    console.log(
        '🚀 ~ file: storyController.js:3 ~ exports.postAStory= ~ body:',
        body
    );
    const { image, music } = body;
    try {
        const musicObj = await Music.findById(music);
        if (!musicObj) {
            return res.status(400).json({
                status: 'fail',
                message: 'No music with that ID!!',
            });
        }
        const data = await Story.create({
            user: req.user._id,
            image,
            music,
        });
        console.log(
            '🚀 ~ file: storyController.js:62 ~ exports.postAStory= ~ data:',
            data
        );
        if (data) {
            return res.status(201).json({
                status: 'success',
                data,
            });
        }
        return res.status(400).json({
            status: 'fail',
            message: 'Some thing went wrong!',
        });
    } catch (error) {
        console.log(error);
    }
};

exports.viewAStory = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story)
        return res.status(404).json({
            status: 'fail',
            message: 'No story found with that ID',
        });
    const result = await StoryViewer.create({
        user: req.user._id,
        story: id,
    });
    if (result)
        return res.status(201).json({
            status: 'success',
            result,
        });

    res.status(400).json({
        status: 'fail',
        message: 'Something went wrong!',
    });
};

// Reaction stories
exports.reactAStory = async (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    console.log(
        '🚀 ~ file: storyController.js:134 ~ exports.reactAStory= ~ type:',
        type
    );
    const story = await Story.findById(id);
    if (!story)
        return res.status(404).json({
            status: 'fail',
            message: 'No story found with that ID',
        });
    try {
        const result = await StoryReaction.create({
            user: req.user._id,
            story: id,
            type,
        });
        if (result)
            return res.status(201).json({
                status: 'success',
                result,
            });
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }

    res.status(400).json({
        status: 'fail',
        message: 'Something went wrong!',
    });
};

// Xoa stories (soft delete)
exports.deleteAStory = async (req, res) => {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story)
        return res.status(404).json({
            status: 'fail',
            message: 'No story found with that ID',
        });
    await Story.findByIdAndUpdate(id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null,
    });
};
// Get Story tu acc ma minh da follow
// Check xem xem hay chua
// Get post từ những người đã follow pageable
// Quên mật khẩu
// Comment post, like post
// Suggested account
