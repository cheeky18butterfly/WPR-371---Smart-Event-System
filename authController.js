const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createAndSendOTP = require('../services/otpService');

exports.registerPage = (req, res) => {
    res.render('auth/register');
};

exports.loginPage = (req, res) => {
    res.render('auth/login');
};

exports.verifyOTPPage = (req, res) => {
    res.render('auth/verify-otp');
};

exports.registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.send('User already exists');
        }

        await User.create({
            name,
            email,
            password
        });

        res.redirect('/login');

    } catch(error) {

        console.log(error);

        res.send('Registration Error');
    }
};

exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.send('Invalid Credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.send('Invalid Credentials');
        }

        req.session.tempUser = user._id;

        await createAndSendOTP(user);

        res.redirect('/verify-otp');

    } catch(error) {

        console.log(error);

        res.send('Login Error');
    }
};

exports.verifyOTP = async (req, res) => {

    try {

        const { otp } = req.body;

        const user = await User.findById(req.session.tempUser);

        if(!user) {
            return res.redirect('/login');
        }

        if(user.otp !== otp) {
            return res.send('Invalid OTP');
        }

        if(user.otpExpires < Date.now()) {
            return res.send('OTP Expired');
        }

        req.session.user = user;

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.redirect('/dashboard');

    } catch(error) {

        console.log(error);

        res.send('OTP Verification Error');
    }
};

exports.logoutUser = (req, res) => {

    req.session.destroy(() => {
        res.redirect('/login');
    });
};