const express = require('express');
const authController = require('../controllers/authController');
const { redirectIfAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', redirectIfAuthenticated, authController.showAuth);
router.post('/register', redirectIfAuthenticated, authController.register);
router.post('/login', redirectIfAuthenticated, authController.login);
router.post('/logout', authController.logout);

module.exports = router;
