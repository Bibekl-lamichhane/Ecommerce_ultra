const mongoose = require('mongoose');
const { applyTimestamps } = require('./Product');
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: String,
  recieverId: String,
  message: String,
},{ timestamps: true });
const Message = mongoose.model('Message', messageSchema);
module.exports = Message;