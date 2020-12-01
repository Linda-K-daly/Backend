const mongoose = require('mongoose');

// Configuration Mongoose model for user
const userSchema = new mongoose.Schema({
    username: String,
    password: {
        type: String,
        minlength: 1
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User


