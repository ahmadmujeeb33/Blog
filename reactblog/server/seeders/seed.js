  
const db = require('../config/connection');

const { User} = require('../models');

db.once('open', async () => {
  await User.deleteMany();

  await User.create({
    userName: 'Pamela',
    email: 'pamela@testmail.com',
    password: 'password12345',
  });
  console.log('users seeded');

  process.exit();
});