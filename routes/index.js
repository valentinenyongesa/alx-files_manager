// routes/index.js
import express from 'express';
import FilesController from '../controllers/FilesController';

const router = express.Router();

router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);

export default router;
