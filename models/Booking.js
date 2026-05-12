const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },  //links booking to a user

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },  //links booking to an event

    numberOfTickets: {
        type: Number,
        required: true,
        min: 1
    },  

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },  // total price for the booking, calculated as event price * number of tickets

    bookingDate: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ['confirmed', 'cancelled'],
        default: 'confirmed'
    }

});
module.exports = mongoose.model('Booking', bookingSchema);