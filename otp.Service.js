const generateOTP = require('../utils/generateOTP');
const sendOTPEmail = require('./emailService');

const User = require('../models/User');

const createAndSendOTP = async (user) => {

    const otp = generateOTP();

    user.otp = otp;

    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();

    await sendOTPEmail(user.email, otp);
};

module.exports = createAndSendOTP;