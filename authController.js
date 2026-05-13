const User = require('../models/User');


// REGISTER PAGE
exports.getRegister = (req, res) => {
    res.render('auth/register');
};


// LOGIN PAGE
exports.getLogin = (req, res) => {
    res.render('auth/login');
};


// REGISTER USER
exports.registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.send('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password
        });

        req.session.user = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        res.redirect('/');

    } catch(error) {
        res.send(error.message);
    }
};


// LOGIN USER
exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.send('Invalid credentials');
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.send('Invalid credentials');
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        res.redirect('/');

    } catch(error) {
        res.send(error.message);
    }
};


// LOGOUT
exports.logoutUser = (req, res) => {

    req.session.destroy(() => {
        res.redirect('/');
    });
};