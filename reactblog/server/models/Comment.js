const mongoose = require('mongoose');

const { Schema } = mongoose;


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