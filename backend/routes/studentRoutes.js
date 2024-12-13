import express from 'express';
import { getProfile, uploadProfile, upload, getProfileById, editStudentProfile} from '../controllers/studentController.js';

const router = express.Router();

// Route to upload a profile
router.post('/add-student', upload.single('profilePicture'), uploadProfile);

// Route to get all students
router.get('/all-students', getProfile);

// Route to get single student
router.get('/:id', getProfileById,);

// Route to get single student
router.patch('/:id', upload.single('profilePicture'), editStudentProfile,);

export default router;
