const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/SocialMediaBlog',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;



// mongodb+srv://ahmadmujeeb333:<password>@cluster0.mr0lanb.mongodb.net/