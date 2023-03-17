const express = require('express');
const { isAuthenticated } = require('../controllers/authController');
const {
    createAHighlight,
    getAllStoryHighLight,
    getAHighLight,
    deleteAHighlight,
    addStoryToHighlight,
    deleteStoryFromHighlight,
} = require('../controllers/storyController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: StoryHighlight
 */

router.use(isAuthenticated);

/**
 * @swagger
 * /story-highlight:
 *   get:
 *     summary: Get story highlights
 *     tags: [StoryHighlight]
 *     responses:
 *       200:
 *         description: OK!
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StoryHighlight'
 *   post:
 *     summary: Create a story highlight
 *     tags: [StoryHighlight]
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      cover:
 *                          type: string
 *                          required: false
 *                      stories:
 *                          type: array
 *                          required: true
 *                          items:
 *                              type: string
 *                              description: story id
 *                      title:
 *                          type: string
 *                          required: true
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
 *                  result:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string
 *                          title:
 *                              type: string
 *                          stories:
 *                              type: array
 *                              items:
 *                                  type: string
 *                          cover:
 *                              type: string
 *                          _id:
 *                              type: string
 *                          __v:
 *                              type: integer
 *
 */

router.route('/').get(getAllStoryHighLight).post(createAHighlight);

/**
 * @swagger
 * /story-highlight/{id}:
 *   get:
 *     summary: Get story highlights
 *     tags: [StoryHighlight]
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
 *                  highlight:
 *                      _id:
 *                          type: string
 *                      user:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                              username:
 *                                  type: string
 *                              avatar:
 *                                  type: string
 *                      title:
 *                          type: string
 *                      stories:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  image:
 *                                      type: string
 *                                  music:
 *                                      type: string
 *                                  expiredIn:
 *                                      type: string
 *                                      format: date-time
 *                                  __v:
 *                                      type: integer
 *                                  active:
 *                                      type: boolean
 *   delete:
 *     summary: Delete a story highlight
 *     tags: [StoryHighlight]
 *     parameters:
 *      - in: path
 *        required: true
 *        name: id
 *        schema:
 *          type: string
 *     responses:
 *       204:
 *         description: OK!
 *
 */
router.route('/:id').get(getAHighLight).delete(deleteAHighlight);

/**
 * @swagger
 * /story-highlight/add-story-to-highlight/{id}:
 *   patch:
 *     summary: Add a story to highlight
 *     tags: [StoryHighlight]
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
 *                      idStory:
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
 *                  storyHighlight:
 *                      _id:
 *                          type: string
 *                      user:
 *                          type: string
 *                      title:
 *                          type: string
 *                      stories:
 *                          type: array
 *                          items:
 *                              type: string
 *                      cover:
 *                          type: string
 *                      __v:
 *                          type: integer
 *                      active:
 *                          type: boolean
 */
router.route('/add-story-to-highlight/:id/').patch(addStoryToHighlight);

/**
 * @swagger
 * /story-highlight/delete-story-from-highlight/{id}:
 *   patch:
 *     summary: Delete a story from highlight
 *     tags: [StoryHighlight]
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
 *                      idStory:
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
 *                  storyHighlight:
 *                      _id:
 *                          type: string
 *                      user:
 *                          type: string
 *                      title:
 *                          type: string
 *                      stories:
 *                          type: array
 *                          items:
 *                              type: string
 *                      cover:
 *                          type: string
 *                      __v:
 *                          type: integer
 *                      active:
 *                          type: boolean
 */
router
    .route('/delete-story-from-highlight/:id/')
    .patch(deleteStoryFromHighlight);

module.exports = router;
