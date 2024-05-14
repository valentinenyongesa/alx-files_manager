// controllers/FilesController.js
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const FilesController = {
  getShow: async (req, res) => {
    const { id } = req.params;
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const file = await dbClient.files.findOne({ _id: id, userId });

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.json(file);
  },

  getIndex: async (req, res) => {
    const { parentId = '0', page = 0 } = req.query;
    const token = req.headers['x-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userId = await redisClient.get(key);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const skip = parseInt(page) * 20;
    const files = await dbClient.files.find({ parentId, userId }).limit(20).skip(skip).toArray();

    return res.json(files);
  },
};

export default FilesController;
