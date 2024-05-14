// controllers/FilesController.js

import fs from 'fs';
import path from 'path';
import mime from 'mime-types';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

const FilesController = {
  // Other methods...

  getFile: async (req, res) => {
    // Existing implementation

    const { size } = req.query;
    const imageSizes = ['500', '250', '100'];

    if (size && !imageSizes.includes(size)) {
      return res.status(400).json({ error: 'Invalid size' });
    }

    let filename = file.name;
    if (size) {
      filename = `${file.id}_${size}`;
    }

    const filePath = path.join(process.env.FOLDER_PATH || '/tmp/files_manager', filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Not found' });
    }

    const fileData = fs.readFileSync(filePath);
    const mimeType = mime.lookup(filename);

    res.setHeader('Content-Type', mimeType);
    res.send(fileData);
  },
};

export default FilesController;
