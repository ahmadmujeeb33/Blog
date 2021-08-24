const moment = require('moment-timezone');
const dateUsa = moment.tz(Date.now(), "America/New_York");
const db = require('../config/connection');

const { User, Post} = require('../models');


var today = moment();
const todayDate = today.format("MMM Do, YYYY")

db.once('open', async () => {

  await Post.deleteMany();

  const allPosts = await Post.insertMany(
        {
            title: 'Pizza',
            content: 'is amazing and the most popular food',
            date_Created: todayDate

        }
  )


  await User.deleteMany();

  await User.create({
    userName: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
    posts: [{_id: allPosts[0]._id}],
    followers: ['Mahmood']
  });
  console.log('users seeded');

  process.exit();
});



// title: allPosts[0].title, content: allPosts[0].content}