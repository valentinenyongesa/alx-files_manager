// controllers/AppController.js
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const AppController = {
  getStatus: async (req, res) => {
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();

    if (redisIsAlive && dbIsAlive) {
      return res.status(200).json({ redis: true, db: true });
    }
    return res.status(500).json({ redis: redisIsAlive, db: dbIsAlive });
  },

  getStats: async (req, res) => {
    try {
      const usersCount = await dbClient.nbUsers();
      const filesCount = await dbClient.nbFiles();
      return res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default AppController;
