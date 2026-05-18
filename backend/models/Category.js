const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  product_type:String,
  usage:String,
  main_category: String,
  sub_category: String,
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;