import express from 'express';
import multer from 'multer';
import { getSetup, updateSetup } from '../controllers/setupController.js';

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' directory exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get setup details
router.get('/', getSetup);

// Update or create setup details
router.post(
  '/',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'sliders', maxCount: 10 },
  ]),
  updateSetup
);

export default router;
