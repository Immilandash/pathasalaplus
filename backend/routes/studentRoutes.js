import express from 'express';
import { addStudent, getStudents } from '../controllers/studentController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Add student
router.post('/add', upload.single('profilePic'), addStudent);

// Get students
router.get('/all-students', getStudents);

export default router;
