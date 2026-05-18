const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  gender:{
    type:String,enum:['male','female']
  },
  product_type:String,
  colour:String,
  usage:String,
  discount_price: Number,
  actual_price: Number,
  ratings: Number,
  no_of_ratings: Number,
  image: String,
  imageURL:String,
  main_category: String,
  sub_category: String,
  quantity: Number,
  description: String,
  
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;