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

router.use(isAuthenticated);

router.route('/').get(getAllStoryHighLight).post(createAHighlight);
router.route('/:id').get(getAHighLight).delete(deleteAHighlight);
router.route('/add-story-to-highlight/:id/').patch(addStoryToHighlight);
router
    .route('/delete-story-from-highlight/:id/')
    .patch(deleteStoryFromHighlight);

module.exports = router;
