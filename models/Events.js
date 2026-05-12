const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: ['concert', 'conference', 'workshop', 'meetup', 'other'], // enum to prevent bad data
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    capacity: {
        type: Number,
        required: true,
        min: 1
    },

    bookedSeats: {
        type: Number,
        default: 0,
        min: 0
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'past', 'cancelled'],
        default: 'upcoming'
    },

});

module.exports = mongoose.model('Event', eventSchema);