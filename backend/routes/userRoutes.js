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
    verifyEmail,
} = require('../controllers/authController');
const {
    getAllUsers,
    getAUser,
    updateProfile,
    resizeImages,
    multerConfig,
    updatePassword,
    forgotPassword,
    resetPassword,
} = require('../controllers/userController');

const router = express.Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   name: Auth
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - email
 *                      - fullname
 *                      - username
 *                      - password
 *                  properties:
 *                      email:
 *                          type: string
 *                          format: email
 *                      fullname:
 *                          type: string
 *                      username:
 *                          type: string
 *                          description: must be unique!
 *                      password:
 *                          type: string
 *                          format: password
 *                          minLength: 6
 *                          description: must be unique!
 *                  example:
 *                      email: your_email@gmail.com
 *                      fullname: fullname
 *                      username: username
 *                      password: password
 *     responses:
 *       201:
 *         description: Sign in successfully!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Auth'
 *       400:
 *         $ref: '#/components/responses/DuplicateUsername'
 *
 */

router.post('/signup', signup);

// Sign in with passport-local

/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Signin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - username
 *                      - password
 *                  properties:
 *                      username:
 *                          type: string
 *                          description: must be unique!
 *                      password:
 *                          type: string
 *                          format: password
 *                          minLength: 6
 *                          description: must be unique!
 *                  example:
 *                      username: username
 *                      password: password
 *     responses:
 *       200:
 *         description: Log in successfully!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Login'
 *       404:
 *         description: Username is not existed!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *             example:
 *                  status: fail
 *                  message: Username is not existed!
 *       400:
 *         description: Username or password is invalid!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *             example:
 *                  status: fail
 *                  message: Username or password is invalid!
 *
 */
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

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout successfully!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *             example:
 *                  status: success
 *                  message: Logout successfully!
 *
 */
router.post('/logout', logout);

/**
 * @swagger
 * tags:
 *   name: User
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get All Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  data:
 *                      type: object
 *                      properties:
 *                          users:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Login'
 *
 */
router.route('/').get(isAuthenticated, getAllUsers);

/**
 * @swagger
 * /users/update-me:
 *   patch:
 *     summary: Update me
 *     tags: [User]
 *     requestBody:
 *       content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      username:
 *                          type: string
 *                      email:
 *                          type: string
 *                      fullname:
 *                          type: string
 *                      bio:
 *                          type: string
 *                      phoneNumber:
 *                          type: string
 *                      avatar:
 *                          type: string
 *                          format: binary
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 */
router
    .route('/update-me')
    .patch(isAuthenticated, multerConfig, resizeImages, updateProfile);

/**
 * @swagger
 * /users/update-password:
 *   patch:
 *     summary: Update password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      currentPassword:
 *                          type: string
 *                      newPassword:
 *                          type: string
 *                      passwordConfirm:
 *                          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 */
router.route('/update-password').patch(isAuthenticated, updatePassword);
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Update password
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *
 */
router.route('/:username').get(isAuthenticated, getAUser);

/**
 * @swagger
 * /users/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *
 */
router.route('/forgot-password').post(forgotPassword);

/**
 * @swagger
 * /users/reset-password/{resetPasswordToken}:
 *   patch:
 *     summary: Reset password
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: resetPasswordToken
 *        required: true
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      newPassword:
 *                          type: string
 *                      newPasswordConfirm:
 *                          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *
 */
router.route('/reset-password/:resetPasswordToken').patch(resetPassword);

/**
 * @swagger
 * /users/verify-email:
 *   put:
 *     summary: Verify Email
 *     tags: [User]
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  message:
 *                      type: string
 *
 */
router.route('/verify-email').put(isAuthenticated, verifyEmail);
module.exports = router;
