const Booking = require('../models/Booking');
const Event = require('../models/Event');
const Enquiry = require('../models/Enquiry');

async function dashboard(req, res, next) {
  try {
    if (req.user.role === 'admin') {
      const [bookings, events, openEnquiries] = await Promise.all([
        Booking.find({ status: 'confirmed' }).populate('event user').sort({ createdAt: -1 }),
        Event.find().sort({ ticketsBooked: -1 }),
        Enquiry.countDocuments({ status: { $ne: 'closed' } })
      ]);

      const totalBookings = bookings.reduce((sum, booking) => sum + booking.quantity, 0);
      const revenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
      const capacity = events.reduce((sum, event) => sum + event.capacity, 0);
      const bookedCapacity = events.reduce((sum, event) => sum + event.ticketsBooked, 0);

      return res.render('dashboard/admin', {
        title: 'Admin Dashboard',
        bookings,
        events,
        openEnquiries,
        stats: {
          totalBookings,
          revenue,
          capacityUsage: capacity ? Math.round((bookedCapacity / capacity) * 100) : 0,
          eventCount: events.length
        }
      });
    }

    const bookings = await Booking.find({ user: req.user._id })
      .populate('event')
      .sort({ createdAt: -1 });

    return res.render('dashboard/user', {
      title: 'My Dashboard',
      bookings
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  dashboard
};
