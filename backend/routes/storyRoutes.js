const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    postAStory,
    multerConfig,
    resizeImages,
} = require('../controllers/storyController');

const router = express.Router();

router.use(isAuthenticated);

router.route('/').post(multerConfig, resizeImages, postAStory);

module.exports = router;
