const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const {
    validateRegister
} = require('../middleware/validationMiddleware');

router.get('/register', authController.getRegister);

router.get('/login', authController.getLogin);

router.post(
    '/register',
    validateRegister,
    authController.registerUser
);

router.post('/login', authController.loginUser);

router.get('/logout', authController.logoutUser);

module.exports = router;