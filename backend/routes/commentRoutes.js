const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    getCommentOfAPost,
    createAComment,
} = require('../controllers/commentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comment
 */

router.use(isAuthenticated);

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - content
 *                      - postId
 *                  properties:
 *                      content:
 *                          type: string
 *                      postId:
 *                          type: string
 *                      parentID:
 *                          type: string
 *     responses:
 *       201:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  comment:
 *                      $ref: '#/components/schemas/Comment'
 */
router.route('/').post(createAComment);

module.exports = router;
