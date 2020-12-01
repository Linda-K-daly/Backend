const mongoose = require('mongoose');

// Configuration Mongoose model for user
const restoSchema = new mongoose.Schema({
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
    RestoId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },

    stars: {
        type: Number,
        min: 1,
        max: 3,
    },

    cuisine: {
        type: String,
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

const Restaurant = new mongoose.model('Restaurant', restoSchema);

module.exports = Restaurant