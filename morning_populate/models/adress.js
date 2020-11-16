const mongoose = require('mongoose');

const AdressSchema = new mongoose.Schema({
    // ID: ObjectId,
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String,
});

const AdressModel = mongoose.model('Adress', AdressSchema);

module.exports = AdressModel;