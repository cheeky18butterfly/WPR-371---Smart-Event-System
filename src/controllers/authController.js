const User = require('../models/User');

function showAuth(req, res) {
  res.render('auth', {
    title: 'Login or Register'
  });
}

async function register(req, res, next) {
  try {
    const { name, email, password, confirmPassword, roleCode } = req.body;

    if (password !== confirmPassword) {
      req.session.error = 'Passwords do not match.';
      return res.redirect('/auth');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.session.error = 'An account with that email already exists.';
      return res.redirect('/auth');
    }

    const role = roleCode === process.env.ADMIN_REGISTRATION_CODE ? 'admin' : 'user';
    const user = await User.create({ name, email, password, role });
    req.session.userId = user._id;
    req.session.success = 'Account created successfully.';
    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      req.session.error = 'Invalid email or password.';
      return res.redirect('/auth');
    }

    req.session.userId = user._id;
    req.session.success = `Welcome back, ${user.name}.`;
    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
}

function logout(req, res, next) {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie('advanced_events_sid');
    return res.redirect('/');
  });
}

module.exports = {
  showAuth,
  register,
  login,
  logout
};
