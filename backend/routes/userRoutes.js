const express = require('express');
const { signup, signin, auth } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

router.route('/').get(getAllUsers);

module.exports = router;
