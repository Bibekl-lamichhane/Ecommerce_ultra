const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String, // String is shorthand for {type: String}
  phonenumber: String,
  email: String,
  password: String,
  role:{
    type:String,enum:['admin','user','shop'],default:'user'
  }
});
const User = mongoose.model('User', userSchema);
module.exports = User;