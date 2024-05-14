// controllers/FilesController.js
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const FilesController = {
  // Other methods...

  putPublish: async (req, res) => {
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

    await dbClient.files.updateOne({ _id: id }, { $set: { isPublic: true } });

    const updatedFile = { ...file, isPublic: true };

    return res.json(updatedFile);
  },

  putUnpublish: async (req, res) => {
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

    await dbClient.files.updateOne({ _id: id }, { $set: { isPublic: false } });

    const updatedFile = { ...file, isPublic: false };

    return res.json(updatedFile);
  },
};

export default FilesController;
