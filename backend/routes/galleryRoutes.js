import express from 'express';
import { uploadImage, getGallery, upload } from '../controllers/galleryController.js';

const router = express.Router();

// Route to upload an image
router.post('/upload', upload.single('file'), uploadImage);

// Route to get all images
router.get('/', getGallery);

export default router;
