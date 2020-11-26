const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ProductSchema = new mongoose.Schema({
  username: String,
  password: String,
  profilePicture: String
});

ProductSchema.plugin(passportLocalMongoose);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;