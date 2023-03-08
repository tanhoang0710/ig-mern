const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    uploadPost,
    resizeImages,
    multerConfig,
    deletePost,
    getPostFromFollowingUsers,
    likeAPost,
    getLikesOfAPost,
} = require('../controllers/postController');

const router = express.Router();

router.use(isAuthenticated);

router
    .route('/')
    .get(getPostFromFollowingUsers)
    .post(multerConfig, resizeImages, uploadPost);

router.route('/:id').get(getLikesOfAPost).patch(likeAPost).delete(deletePost);

module.exports = router;
