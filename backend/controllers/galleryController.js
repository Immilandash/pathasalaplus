import Gallery from '../models/Gallery.js';
import path from 'path';
import multer from 'multer';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Controller to handle image upload
export const uploadImage = async (req, res) => {
  try {
    const { description } = req.body;
    const filePath = req.file.filename;

    const newImage = new Gallery({ description, filePath });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
};

// Controller to get all images
export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
};

export { upload };
