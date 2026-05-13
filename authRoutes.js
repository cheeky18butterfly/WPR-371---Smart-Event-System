const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

const { validateRegister } = require('../utils/validators');

router.get('/register', authController.registerPage);

router.post(
    '/register',
    validateRegister,
    authController.registerUser
);

router.get('/login', authController.loginPage);

router.post('/login', authController.loginUser);

router.get('/verify-otp', authController.verifyOTPPage);

router.post('/verify-otp', authController.verifyOTP);

router.get('/logout', authController.logoutUser);

module.exports = router;