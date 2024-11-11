import Student from '../models/student.js';
import multer from 'multer';
import path from 'path';

// Storage setup for profile picture
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the original filename
  }
});
const upload = multer({ storage: storage });

// Add Student
export const addStudent = async (req, res) => {
  try {
    const { name, email, whatsappNumber, address, aadharNumber, campusNumber, seatNumber } = req.body;
    const profilePicture = req.file ? req.file.filename : '';

    const newStudent = new Student({
      name,
      email,
      whatsappNumber,
      address,
      aadharNumber,
      campusNumber,
      seatNumber,
      profilePicture
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding student' });
  }
};

// Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching students' });
  }
};
