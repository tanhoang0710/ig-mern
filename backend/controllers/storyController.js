const multer = require('multer');
const sharp = require('sharp');
const Music = require('../models/musicModel');
const Follow = require('../models/followModel');
const Story = require('../models/storyModel');
const StoryReaction = require('../models/storyReactionModel');
const StoryViewer = require('../models/storyViewerModel');
const StoryHighlight = require('../models/storyHighlightModel');

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
    // console.log(req.files);
    // req.body.image = [];
    console.log('🚀 ~ file: storyController.js:32 ~ req.body:', req.body);

    req.body.image = `storyImg-${req.user._id}-${Date.now()}-${
        req.files?.image[0]?.originalname.split('.')[0]
    }.jpeg`;
    console.log(
        '🚀 ~ file: storyController.js:36 ~ req.body.image=`storyImg-${req.user._id}-${Date.now ~ req.body:',
        req.body
    );
    await sharp(req?.files?.image[0]?.buffer)
        .resize(900, 676)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/stories/${req.body.image}`);

    console.log('🚀 ~ file: storyController.js:43 ~ req.body:', req.body);
    // console.log(req.body.images);
    console.log('🚀 ~ file: storyController.js:45 ~ req.body:', req.body);
    next();
};

exports.postAStory = async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    console.log(
        '🚀 ~ file: storyController.js:51 ~ exports.postAStory= ~ req.body:',
        req.body
    );
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
        '🚀 ~ file: storyController.js:117 ~ exports.reactAStory= ~ req.body:',
        req.body
    );
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
    if (!story.user.equals(req.user._id))
        return res.status(403).json({
            status: 'fail',
            message: `You're not the author of this story!`,
        });
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
// Get Story tu acc ma minh da follow và chưa expired
exports.getStories = async (req, res) => {
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

    // Lấy ra 10 stories chưa expired và thuộc những người mình follow
    const stories = await Story.find({
        // expiredIn: { $gt: now },
        user: { $in: listFollowingID },
    })
        .skip(skip)
        .limit(limit)
        .populate('user', 'username avatar');

    const storiesWithCheckViewByUser = await Promise.all(
        stories.map(async (story) => {
            const checkviewByUser = await StoryViewer.findOne({
                story: story._id,
                user: _id,
            });

            const viewedByUser = checkviewByUser ? true : false;
            return { ...story.toObject(), viewedByUser };
        })
    );

    res.status(200).json({
        status: 'success',
        storiesWithCheckViewByUser,
    });
};
// Comment post, like post
// Suggested account

// CRUD Story highlight
exports.createAHighlight = async (req, res) => {
    const { _id } = req.user;
    let cover;
    const { stories, title } = req.body;

    if (req.body.cover) cover = req.body.cover;
    else cover = stories[0];

    const result = await StoryHighlight.create({
        user: _id,
        cover,
        stories,
        title,
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

exports.getAllStoryHighLight = async (req, res) => {
    const { _id } = req.user;
    const highlights = await StoryHighlight.find({
        user: _id,
        active: true,
    })
        .populate('cover', 'image')
        .select('title cover');
    if (highlights)
        return res.status(200).json({
            status: 'success',
            highlights,
        });
    return res.status(400).json({
        status: 'fail',
        message: 'Something went wrong!',
    });
};

exports.getAHighLight = async (req, res) => {
    const { id } = req.params;
    try {
        const highlight = await StoryHighlight.findById(id)
            .populate('user', 'username avatar')
            .populate('stories', '-user')
            .select('-cover');
        if (highlight)
            return res.status(200).json({
                status: 'success',
                highlight,
            });
        return res.status(404).json({
            status: 'fail',
            message: 'No story highlight found with that ID!',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.deleteAHighlight = async (req, res) => {
    try {
        const { id } = req.params;
        const storyHighlight = await StoryHighlight.findById(id);
        if (!storyHighlight)
            return res.status(404).json({
                status: 'fail',
                message: 'No story highlight found with that ID',
            });
        await StoryHighlight.findByIdAndUpdate(id, { active: false });

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.addStoryToHighlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { idStory } = req.body;
        const storyHighlight = await StoryHighlight.findById(id);
        if (!storyHighlight)
            return res.status(404).json({
                status: 'fail',
                message: 'No story highlight found with that ID',
            });

        if (!storyHighlight.stories.includes(idStory)) {
            storyHighlight.stories = [...storyHighlight.stories, idStory];
            await storyHighlight.save();
            return res.status(200).json({
                status: 'success',
                storyHighlight,
            });
        }
        return res.status(404).json({
            status: 'fail',
            message: 'That story is already existed in this highlight!',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

exports.deleteStoryFromHighlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { idStory } = req.body;
        const storyHighlight = await StoryHighlight.findById(id);
        if (!storyHighlight)
            return res.status(404).json({
                status: 'fail',
                message: 'No story highlight found with that ID',
            });
        const index = storyHighlight.stories.indexOf(idStory);
        if (index !== -1) {
            storyHighlight.stories = [
                ...storyHighlight.stories.slice(0, index),
                ...storyHighlight.stories.slice(index + 1),
            ];

            await storyHighlight.save();
            return res.status(200).json({
                status: 'success',
                storyHighlight,
            });
        }
        return res.status(404).json({
            status: 'fail',
            message: 'There is no story with that id in this highlight!',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
