const express = require('express');
const { isAuthenticated, retrictTo } = require('../controllers/authController');
const {
    requestBlueTick,
    rejectBluetick,
    removeBluetick,
    getAllRequest,
    verifyBluetick,
} = require('../controllers/bluetickController');

const router = express.Router();

router.use(isAuthenticated);

/**
 * @swagger
 * tags:
 *   name: Bluetick
 */

/**
 * @swagger
 * /bluetick:
 *   post:
 *     summary: Request bluetick
 *     tags: [Bluetick]
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
 *                  bluetick:
 *                      $ref: '#/components/schemas/Bluetick'
 */

router.route('/').post(retrictTo('normal'), requestBlueTick);

// Admin routes
router.use(retrictTo('admin'));

/**
 * @swagger
 * /bluetick/admin:
 *   get:
 *     summary: Get all request bluetick
 *     tags: [Bluetick]
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
 *                  blueticks:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Bluetick'
 */
router.route('/admin').get(getAllRequest);

/**
 * @swagger
 * /bluetick/admin/{id}:
 *   post:
 *     summary: Verify bluetick
 *     tags: [Bluetick]
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
 *                  bluetick:
 *                      $ref: '#/components/schemas/Bluetick'
 *   patch:
 *     summary: Reject bluetick
 *     tags: [Bluetick]
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
 *                  bluetick:
 *                      $ref: '#/components/schemas/Bluetick'
 *   delete:
 *     summary: Remove bluetick
 *     tags: [Bluetick]
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
 *                  bluetick:
 *                      $ref: '#/components/schemas/Bluetick'
 */
router
    .route('/admin/:id')
    .post(verifyBluetick)
    .patch(rejectBluetick)
    .delete(removeBluetick);
module.exports = router;
