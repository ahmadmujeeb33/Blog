const mongoose = require('mongoose');

const { Schema } = mongoose;

const moment = require('moment-timezone');
const dateUsa = moment.tz(Date.now(), "America/New_York");

// console.log(dateUsa);

const commentSchema = new Schema({
  content: {
    type: String,
    // required: true,
    sparse:true
  },
  date_Created: {type: String, sparse:true },

  userName:{type: String}
  
  
});


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;