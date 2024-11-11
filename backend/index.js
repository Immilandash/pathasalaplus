import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Serve the app (if needed)
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
