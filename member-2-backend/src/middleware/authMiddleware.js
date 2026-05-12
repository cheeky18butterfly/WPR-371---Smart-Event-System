const User = require('../models/User');

async function attachUser(req, res, next) {
  res.locals.currentUser = null;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  delete req.session.success;
  delete req.session.error;

  if (!req.session.userId) return next();

  try {
    const user = await User.findById(req.session.userId).select('-password');
    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAuth(req, res, next) {
  if (req.user) return next();
  req.session.error = 'Please log in to continue.';
  return res.redirect('/auth');
}

function requireRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) return next();
    req.session.error = 'You do not have permission to access that page.';
    return res.redirect('/');
  };
}

function redirectIfAuthenticated(req, res, next) {
  if (req.user) return res.redirect('/dashboard');
  return next();
}

module.exports = {
  attachUser,
  requireAuth,
  requireRole,
  redirectIfAuthenticated
};
