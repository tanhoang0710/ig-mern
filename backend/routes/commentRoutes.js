const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    createAComment,
    getReplyComment,
    likeAComment,
    unlikeAComment,
    deleteComment,
    editComment,
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

/**
 * @swagger
 * /comment/{id}/like:
 *   patch:
 *     summary: Like a comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
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
 *                      type: string
 *                  comment:
 *                      $ref: '#/components/schemas/Comment'
 *   delete:
 *     summary: Unlike a comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
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
 *                      type: string
 *                  comment:
 *                      $ref: '#/components/schemas/Comment'
 */
router.route('/:id/like').patch(likeAComment).delete(unlikeAComment);

/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get reply comments of a comment pageable
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *      - in: query
 *        required: true
 *        name: page
 *        schema:
 *          type: string
 *      - in: query
 *        required: true
 *        name: limit
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
 *                      type: string
 *                  total:
 *                      type: integer
 *                  totalPages:
 *                      type: integer
 *                  comments:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Comment'
 *   delete:
 *     summary: Delete A Comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
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
 *                      type: string
 *                  total:
 *                      type: integer
 *                  totalPages:
 *                      type: integer
 *                  comments:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Comment'
 *   patch:
 *     summary: Edit A Comment
 *     tags: [Comment]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - content
 *                  properties:
 *                      content:
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
 *                  total:
 *                      type: integer
 *                  totalPages:
 *                      type: integer
 *                  comments:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Comment'
 */
router
    .route('/:id')
    .get(getReplyComment)
    .delete(deleteComment)
    .patch(editComment);
module.exports = router;
