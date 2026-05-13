const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (email, otp) => {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,

        to: email,

        subject: 'OTP Verification',

        html: `
            <h2>Smart Events OTP Verification</h2>
            <p>Your OTP Code is:</p>
            <h1>${otp}</h1>
            <p>This code expires in 5 minutes.</p>
        `
    });
};

module.exports = sendOTPEmail;