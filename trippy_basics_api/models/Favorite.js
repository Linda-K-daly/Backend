const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({

    favorite: Boolean,

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    hotel: {
        type: mongoose.Types.ObjectId,
        ref: 'Hotel'
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant'
    }
});

const Favorite = new mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite