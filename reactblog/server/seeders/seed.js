const moment = require('moment-timezone');
const dateUsa = moment.tz(Date.now(), "America/New_York");
const db = require('../config/connection');

const { User, Post} = require('../models');

db.once('open', async () => {

  await Post.deleteMany();

  const allPosts = await Post.insertMany(
        {
            title: 'Pizza',
            content: 'is amazing and the most popular food',
            
        }
  )


  await User.deleteMany();

  await User.create({
    userName: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    posts: [allPosts[0]._id]
  });
  console.log('users seeded');

  process.exit();
});