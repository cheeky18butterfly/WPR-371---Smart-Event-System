const mongoose = require('mongoose');
const Event = require('../models/Event');

const categories = ['Conference', 'Workshop', 'Festival', 'Private Event', 'Networking', 'Other'];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function listEvents(req, res, next) {
  try {
    const { q, category, date, availability } = req.query;
    const filter = {};

    if (q) {
      const search = new RegExp(escapeRegex(q), 'i');
      filter.$or = [{ title: search }, { description: search }, { venue: search }];
    }

    if (category) filter.category = category;

    if (date === 'upcoming') filter.date = { $gte: new Date() };
    if (date === 'past') filter.date = { $lt: new Date() };

    const events = await Event.find(filter).sort({ date: 1 });
    const filteredEvents =
      availability === 'available'
        ? events.filter((event) => event.availableTickets > 0)
        : availability === 'sold-out'
          ? events.filter((event) => event.availableTickets <= 0)
          : events;

    res.render('events/index', {
      title: 'Events',
      events: filteredEvents,
      categories,
      filters: { q, category, date, availability }
    });
  } catch (error) {
    next(error);
  }
}

async function showEvent(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      req.session.error = 'Event not found.';
      return res.redirect('/');
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      req.session.error = 'Event not found.';
      return res.redirect('/');
    }

    return res.render('events/show', {
      title: event.title,
      event
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listEvents,
  showEvent,
  categories
};
