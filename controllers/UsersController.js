// controllers/UsersController.js
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating user ID
import dbClient from '../utils/db'; // Import MongoDB client

const UsersController = {
  postNew: async (req, res) => {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      // Check if email already exists in the database
      const userExists = await dbClient.users.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: 'Already exist' });
      }

      // Hash the password using SHA1 (as specified)
      const hashedPassword = sha1(password);

      // Create a new user object
      const newUser = {
        email,
        password: hashedPassword,
      };

      // Insert the new user into the database
      const { insertedId } = await dbClient.users.insertOne(newUser);

      // Respond with the newly created user's ID and email
      return res.status(201).json({ id: insertedId, email });
    } catch (error) {
      console.error('Error creating new user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default UsersController;
