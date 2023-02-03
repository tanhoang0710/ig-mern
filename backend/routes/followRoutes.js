const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    followAUser,
    unfollowAUser,
    getAllFollow,
} = require('../controllers/followController');

const router = express.Router();

router.use(isAuthenticated);

router.route('/').get(getAllFollow);

router.route('/:otherUserId').post(followAUser).delete(unfollowAUser);

module.exports = router;
