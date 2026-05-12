const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, // name of the person contacting support

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }, // email of the person contacting support

    subject: {
        type: String,
        required: true,
        trim: true
    }, 

    message: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        enum: ['open', 'in progress', 'closed'],
        default: 'open'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Contact', contactSchema);