const multer = require('multer');
const sharp = require('sharp');
const Music = require('../models/MusicModel');
const Story = require('../models/StoryModel');

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
