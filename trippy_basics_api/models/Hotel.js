const mongoose = require('mongoose');

// Configuration Mongoose model for user
const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    hotelId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    stars: {
        type: Number,
        min: 1,
        max: 5,
    },

    hasSPa: {
        type: Boolean,
        required: true,
    },

    hasPool:  {
        type: Boolean,
        required: true,
    },

    priceCategory: {
        type: Number,
        required: true,
        min: 1,
        max: 3,
    },

    isFavorite: {
        type: Boolean
    }
});

const Hotel = new mongoose.model('Hotel', hotelSchema);

module.exports = Hotel