const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    followAUser,
    unfollowAUser,
    getAllFollow,
    checkFollow,
} = require('../controllers/followController');

const router = express.Router();

router.use(isAuthenticated);

router.route('/').get(getAllFollow);

router.route('/get-follow/:otherUserId').get(getAllFollow);

router
    .route('/:otherUserId')
    .get(checkFollow)
    .post(followAUser)
    .delete(unfollowAUser);

module.exports = router;
