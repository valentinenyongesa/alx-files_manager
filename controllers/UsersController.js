// controllers/UsersController.js
const User = require('../models/User');
const userQueue = require('../utils/userQueue');

async function postUser(req, res) {
  // Process user creation and store user in the database
  // ...
  
  // Add job to userQueue for sending welcome email
  await userQueue.add({ userId: newUser.id });

  // Return response
  res.status(201).json(newUser);
}
