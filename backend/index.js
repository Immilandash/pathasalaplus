import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import setupRoutes from './routes/setupRoutes.js';
import superadminRoutes from './routes/superAdminRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
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
app.use('/api/students/id', studentRoutes);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/api/setup', setupRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/superadmin', superadminRoutes);


const PORT = process.env.PORT || 5000
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Serve the app (if needed)
app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
