const Event = require('../models/Event');
const { categories } = require('./eventController');

async function index(req, res, next) {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.render('admin/events', {
      title: 'Manage Events',
      events,
      categories,
      editingEvent: null
    });
  } catch (error) {
    next(error);
  }
}

async function edit(req, res, next) {
  try {
    const [events, editingEvent] = await Promise.all([
      Event.find().sort({ date: 1 }),
      Event.findById(req.params.id)
    ]);

    if (!editingEvent) {
      req.session.error = 'Event not found.';
      return res.redirect('/admin/events');
    }

    return res.render('admin/events', {
      title: 'Edit Event',
      events,
      categories,
      editingEvent
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    await Event.create({
      ...req.body,
      createdBy: req.user._id
    });
    req.session.success = 'Event created successfully.';
    res.redirect('/admin/events');
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      req.session.error = 'Event not found.';
      return res.redirect('/admin/events');
    }

    const nextCapacity = Number(req.body.capacity);
    if (nextCapacity < event.ticketsBooked) {
      req.session.error = 'Capacity cannot be lower than tickets already booked.';
      return res.redirect(`/admin/events/${event._id}/edit`);
    }

    Object.assign(event, req.body);
    await event.save();

    req.session.success = 'Event updated successfully.';
    return res.redirect('/admin/events');
  } catch (error) {
    return next(error);
  }
}

async function remove(req, res, next) {
  try {
    await Event.findByIdAndDelete(req.params.id);
    req.session.success = 'Event deleted successfully.';
    res.redirect('/admin/events');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  edit,
  create,
  update,
  remove
};
