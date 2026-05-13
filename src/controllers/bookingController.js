const Booking = require('../models/Booking');
const Event = require('../models/Event');

async function create(req, res, next) {
  try {
    const quantity = Number(req.body.quantity || 1);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      req.session.error = 'Please choose between 1 and 10 tickets.';
      return res.redirect(`/events/${req.params.eventId}`);
    }

    const event = await Event.findOneAndUpdate(
      {
        _id: req.params.eventId,
        $expr: { $lte: [{ $add: ['$ticketsBooked', quantity] }, '$capacity'] }
      },
      { $inc: { ticketsBooked: quantity } },
      { new: true }
    );

    if (!event) {
      const currentEvent = await Event.findById(req.params.eventId);
      req.session.error = currentEvent
        ? `Only ${currentEvent.availableTickets} ticket(s) are available.`
        : 'Event not found.';
      return res.redirect(currentEvent ? `/events/${req.params.eventId}` : '/');
    }

    try {
      await Booking.create({
        user: req.user._id,
        event: event._id,
        quantity,
        totalPrice: quantity * event.price
      });
    } catch (bookingError) {
      await Event.findByIdAndUpdate(event._id, { $inc: { ticketsBooked: -quantity } });
      throw bookingError;
    }

    req.session.success = 'Booking confirmed.';
    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
}

async function cancel(req, res, next) {
  try {
    const booking = await Booking.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
        status: 'confirmed'
      },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      req.session.error = 'Booking not found.';
      return res.redirect('/dashboard');
    }

    await Event.findByIdAndUpdate(booking.event, {
      $inc: { ticketsBooked: -booking.quantity }
    });

    req.session.success = 'Booking cancelled.';
    return res.redirect('/dashboard');
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  cancel
};
