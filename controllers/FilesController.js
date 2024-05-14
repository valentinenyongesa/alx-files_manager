// controllers/FilesController.js
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const FilesController = {
  // Other methods...

  getFile: async (req, res) => {
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

    const file = await dbClient.files.findOne({ _id: id });

    if (!file) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (!file.isPublic && file.userId !== userId) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (file.type === 'folder') {
      return res.status(400).json({ error: "A folder doesn't have content" });
    }

    const filePath = path.join(process.env.FOLDER_PATH || '/tmp/files_manager', file.id);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Not found' });
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const mimeType = mime.lookup(file.name);

    res.setHeader('Content-Type', mimeType);
    res.send(fileData);
  },
};

export default FilesController;
