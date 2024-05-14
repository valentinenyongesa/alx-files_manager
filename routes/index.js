// routes/index.js
import express from 'express';
import FilesController from '../controllers/FilesController';

const router = express.Router();

router.post('/files', FilesController.postUpload);

export default router;
