const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    uploadPost,
    resizeImages,
    multerConfig,
    deletePost,
} = require('../controllers/postController');

const router = express.Router();

router.use(isAuthenticated);

router.route('/').post(multerConfig, resizeImages, uploadPost);

router.route('/:id').delete(deletePost);

module.exports = router;
