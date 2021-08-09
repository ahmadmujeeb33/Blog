const mongoose = require('mongoose');

const { Schema } = mongoose;


const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date_created: {
    type: Date,
    required: true,
    unique: true,
    default: Date.now
  },
  content: {
    type: String,
    required: true,
  },
});



const Post = mongoose.model('Post', postSchema);

module.exports = Post;