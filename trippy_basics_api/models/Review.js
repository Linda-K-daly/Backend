const mongoose = require('mongoose');

// Configuration Mongoose model for user
const reviewSchema = new mongoose.Schema({
    review: String,
    stars: {
        type: Number,
        minlength: 1,
        maxlength: 5
    },
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

const Review = new mongoose.model('Review', reviewSchema);

module.exports = Review