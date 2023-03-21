const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const { getCommentOfAPost } = require('../controllers/commentController');
const {
    uploadPost,
    resizeImages,
    multerConfig,
    deletePost,
    getPostFromFollowingUsers,
    likeAPost,
    getLikesOfAPost,
    unlikePost,
} = require('../controllers/postController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Post
 */

router.use(isAuthenticated);

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Get posts from following users pageable
 *     tags: [Post]
 *     parameters:
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
 *                  posts:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      _id:
 *                                          type: string
 *                                      username:
 *                                          type: string
 *                                      avatar:
 *                                          type: string
 *                              createdAt:
 *                                  type: string
 *                              id:
 *                                  type: string
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      caption:
 *                          type: string
 *                      images:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
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
 *                  posts:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      user:
 *                                          type: string
 *                                      images:
 *                                          type: array
 *                                          items:
 *                                              type: string
 *                                      createdAt:
 *                                          type: string
 *                                      liked_by:
 *                                          type: array
 *                                          items:
 *                                              type: string
 *                                      caption:
 *                                          type: string
 *                                      _id:
 *                                          type: string
 *                                      __v:
 *                                          type: integer
 *                                      id:
 *                                          type: string
 */

router
    .route('/')
    .get(getPostFromFollowingUsers)
    .post(multerConfig, resizeImages, uploadPost);

/**
 * @swagger
 * /post/{id}/comments:
 *   get:
 *     summary: Get root comments of a post pageable
 *     tags: [Post]
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
 */

router.route('/:id/comments').get(getCommentOfAPost);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Get likes of a post
 *     tags: [Post]
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
 *                  liked_by:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                  total:
 *                      type: integer
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *     responses:
 *       204:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  status:
 *                      type: string
 *                  data:
 *                      type: null
 */
router.route('/:id').get(getLikesOfAPost).delete(deletePost);

/**
 * @swagger
 * /post/like-post/{id}:
 *   patch:
 *     summary: Like a post
 *     tags: [Post]
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
 *                  message:
 *                      type: string
 */
router.route('/like-post/:id').patch(likeAPost);

/**
 * @swagger
 * /post/unlike-post/{id}:
 *   patch:
 *     summary: Unlike a post
 *     tags: [Post]
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
 *                  data:
 *                      type: null
 */
router.route('/unlike-post/:id').patch(unlikePost);

module.exports = router;
