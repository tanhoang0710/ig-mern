const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    postAStory,
    multerConfig,
    resizeImages,
    viewAStory,
    reactAStory,
    deleteAStory,
    getStories,
} = require('../controllers/storyController');

const router = express.Router();

router.use(isAuthenticated);

router.route('/').get(getStories).post(multerConfig, resizeImages, postAStory);
router.route('/:id').post(viewAStory).delete(deleteAStory);
router.route('/story-reaction/:id').post(reactAStory);

module.exports = router;
