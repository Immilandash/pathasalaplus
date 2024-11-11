import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  description: { type: String, required: true },
  filePath: { type: String, required: true },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
