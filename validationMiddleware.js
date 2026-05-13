module.exports.validateRegister = (req, res, next) => {

    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.send('All fields are required');
    }

    if(password.length < 6) {
        return res.send('Password must be at least 6 characters');
    }

    next();
};