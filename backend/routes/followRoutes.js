const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    followAUser,
    unfollowAUser,
    getAllFollow,
    checkFollow,
} = require('../controllers/followController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Follow
 */

router.use(isAuthenticated);

/**
 * @swagger
 * /follow:
 *   get:
 *     summary: Get all follow
 *     tags: [Follow]
 *     parameters:
 *      - in: query
 *        required: true
 *        name: type
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 */

router.route('/').get(getAllFollow);

/**
 * @swagger
 * /follow/get-follow/{otherUserId}:
 *   get:
 *     summary: Get all follow of a user
 *     tags: [Follow]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: otherUserId
 *        schema:
 *          type: string
 *      - in: query
 *        required: true
 *        name: type
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 */

router.route('/get-follow/:otherUserId').get(getAllFollow);

/**
 * @swagger
 * /follow/{otherUserId}:
 *   get:
 *     summary: Check follow status with other user
 *     tags: [Follow]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: otherUserId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  following:
 *                      type: boolean
 *                  followed:
 *                      type: boolean
 *                  followEachOther:
 *                      type: boolean
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: otherUserId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: boolean
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follow]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: otherUserId
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: boolean
 */
router
    .route('/:otherUserId')
    .get(checkFollow)
    .post(followAUser)
    .delete(unfollowAUser);

module.exports = router;
