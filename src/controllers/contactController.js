const Enquiry = require('../models/Enquiry');

async function show(req, res, next) {
  try {
    const enquiries =
      req.user && req.user.role === 'admin'
        ? await Enquiry.find().populate('submittedBy', 'name email').sort({ createdAt: -1 })
        : [];

    res.render('contact', {
      title: 'Contact',
      enquiries
    });
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    await Enquiry.create({
      name,
      email,
      subject,
      message,
      submittedBy: req.user ? req.user._id : undefined
    });
    req.session.success = 'Your enquiry has been submitted.';
    res.redirect('/contact');
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { runValidators: true });
    req.session.success = 'Enquiry status updated.';
    res.redirect('/contact');
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    req.session.success = 'Enquiry deleted.';
    res.redirect('/contact');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  show,
  create,
  updateStatus,
  remove
};
