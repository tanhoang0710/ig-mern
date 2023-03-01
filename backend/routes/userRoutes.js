const express = require('express');
const {
    signup,
    signin,
    loginWithSocialFail,
    loginWithSocialSuccess,
    loginWithGoogle,
    loginWithGithub,
    isAuthenticated,
    logout,
} = require('../controllers/authController');
const { getAllUsers, getAUser } = require('../controllers/userController');

const router = express.Router();
const passport = require('passport');

router.post('/signup', signup);
// Sign in with passport-local
router.post('/signin', signin);

// Sign in with passport-google-oauth20
router.get('/login/failed', loginWithSocialFail);

router.get('/login/success', loginWithSocialSuccess);

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback', loginWithGoogle);

router.get(
    '/github',
    passport.authenticate('github', { scope: ['profile', 'email'] })
);
router.get('/github/callback', loginWithGithub);

router.post('/logout', logout);

router.route('/').get(isAuthenticated, getAllUsers);
router.route('/:username').get(isAuthenticated, getAUser);

module.exports = router;
