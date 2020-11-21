const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    // ID: ObjectId,
    firstName: String,
    surname: String,
    adress: {
        type: mongoose.Types.ObjectId,
        ref: 'Adress'
    },
});

const StudentModel = mongoose.model('student', StudentSchema);

module.exports = StudentModel;