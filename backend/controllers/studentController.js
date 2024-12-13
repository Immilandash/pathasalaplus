import Student from '../models/student.js';
import path from 'path';
import multer from 'multer';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Controller to handle image upload
export const uploadProfile = async (req, res) => {
  try {
    const { name,email, whatsappNumber,altMobileNumber,  address, zipCode, aadharNumber,fatherName, campusNumber,seatNumber, date } = req.body;
    const profilePicture = req.file.filename;

    const newStudent = new Student({ name, email, whatsappNumber,altMobileNumber, address, zipCode, aadharNumber, fatherName, campusNumber, seatNumber, date, profilePicture });
    await newStudent.save();

    res.status(201).json({ message: 'profile uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile', error });
  }
};

// Controller to get all images
export const getProfile = async (req, res) => {
  try {
    const stdents = await Student.find();
    res.status(200).json(stdents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
};



export const getProfileById = async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student ID from the request parameters
    const student = await Student.findById(studentId); // Find student by ID in the database

    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // If student is not found
    }

    res.status(200).json(student); // Send the student data if found
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};



export { upload };




// Update a student profile by ID
export const editStudentProfile = async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  // Check if a new profile picture was uploaded
  if (req.file) {
    updatedData.profilePicture = req.file.filename; // Save file name to `profilePicture` field
  }

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updatedData, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};
