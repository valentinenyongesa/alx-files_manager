// routes/index.js
import express from 'express';
import FilesController from '../controllers/FilesController';

const router = express.Router();

// Other routes...

router.get('/files/:id/data', FilesController.getFile);

export default router;
