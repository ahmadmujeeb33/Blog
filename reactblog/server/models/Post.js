const mongoose = require('mongoose');

const { Schema } = mongoose;

const moment = require('moment-timezone');
const dateUsa = moment.tz(Date.now(), "America/New_York");

console.log(dateUsa);

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    sparse:true
  },  
  content: {
    type: String,
    required: true,
    sparse:true
  },
  date_Created: {type: String, required: true, sparse:true }
  
  
});


const Post = mongoose.model('Post', postSchema);

module.exports = Post;