const mongoose = require('mongoose');

const { Schema } = mongoose;

const moment = require('moment-timezone');
const dateUsa = moment.tz(Date.now(), "America/New_York");

console.log(dateUsa);

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },  
  content: {
    type: String,
    required: true,
  },
  date_Created: {type: String, "default": moment.tz(Date.now(), "America/New_York")}
  
  
});

postSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;