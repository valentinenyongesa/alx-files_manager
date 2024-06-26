// routes/index.js

import express from 'express';
import FilesController from '../controllers/FilesController';
import Bull from 'bull';

const fileQueue = new Bull('fileQueue');

const router = express.Router();

router.post('/files', FilesController.postUpload);

export default router;

fileQueue.process(async (job) => {
  const { userId, fileId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.files.findOne({ _id: fileId, userId: userId });

  if (!file) {
    throw new Error('File not found');
  }

  const filePath = path.join(process.env.FOLDER_PATH || '/tmp/files_manager', file.id);
  const imageSizes = [500, 250, 100];

  for (const size of imageSizes) {
    await generateThumbnail(filePath, size);
  }
});

async function generateThumbnail(filePath, size) {
  // Use image-thumbnail module to generate thumbnails
}
