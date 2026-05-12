const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Conference', 'Workshop', 'Festival', 'Private Event', 'Networking', 'Other']
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    price: {
      type: Number,
      required: [true, 'Ticket price is required'],
      min: 0
    },
    capacity: {
      type: Number,
      required: [true, 'Capacity is required'],
      min: 1
    },
    ticketsBooked: {
      type: Number,
      default: 0,
      min: 0
    },
    imageUrl: {
      type: String,
      default: '/images/event-default.svg'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

eventSchema.virtual('availableTickets').get(function availableTickets() {
  return Math.max(this.capacity - this.ticketsBooked, 0);
});

eventSchema.virtual('isSoldOut').get(function isSoldOut() {
  return this.availableTickets <= 0;
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
