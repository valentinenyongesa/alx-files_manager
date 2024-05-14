// routes/index.js
import express from 'express';
import FilesController from '../controllers/FilesController';

const router = express.Router();

// Other routes...

router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);

export default router;
