const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    postAStory,
    multerConfig,
    resizeImages,
    viewAStory,
    reactAStory,
    deleteAStory,
    getStories,
    getStoryViewer,
} = require('../controllers/storyController');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Story
 */

/**
 * @swagger
 * /story:
 *   get:
 *     summary: Get stories from following users pageable
 *     tags: [Story]
 *     parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: string
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Story'
 *   post:
 *     summary: Create a story
 *     tags: [Story]
 *     requestBody:
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      music:
 *                          type: string
 *                          description: music id
 *                      image:
 *                          type: string
 *                          format: binary
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
 *                          user:
 *                              type: string
 *                          image:
 *                              type: string
 *                          music:
 *                              type: string
 *                          createdAt:
 *                              type: string
 *                              format: date-time
 *                          expiredIn:
 *                              type: string
 *                              format: date-time
 *                          _id:
 *                              type: string
 *                          __v:
 *                              type: integer
 *
 */

router.use(isAuthenticated);

router.route('/').get(getStories).post(multerConfig, resizeImages, postAStory);

/**
 * @swagger
 * /story/{id}:
 *   delete:
 *     summary: Delete a story
 *     tags: [Story]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *     responses:
 *       204:
 *         description: OK!
 *   post:
 *     summary: View a story
 *     tags: [Story]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
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
 *                  result:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string
 *                          story:
 *                              type: string
 *                          _id:
 *                              type: string
 *                          __v:
 *                              type: integer
 *
 *   get:
 *     summary: Get viewers of a story pageable
 *     tags: [Story]
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
 *                  viewers:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/User'
 *
 */
router.route('/:id').get(getStoryViewer).post(viewAStory).delete(deleteAStory);

/**
 * @swagger
 * /story/story-reaction/{id}:
 *   post:
 *     summary: React a story
 *     tags: [Story]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      type:
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
 *                  result:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string
 *                          story:
 *                              type: string
 *                          type:
 *                              type: string
 *                          _id:
 *                              type: string
 *                          __v:
 *                              type: integer
 *
 */
router.route('/story-reaction/:id').post(reactAStory);

module.exports = router;
