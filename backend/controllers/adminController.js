import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// const JWT_SECRET = 'super-secret-key';

// Admin registration
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({ name, email, password: hashedPassword });
  await newAdmin.save();
  res.status(201).json({ message: 'Admin registration request sent' });
};

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email, status: 'approved' });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials or not approved' });
  }

  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token });
};
