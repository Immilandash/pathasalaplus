import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

const SUPERADMIN_ID = 'pythonboss';
const SUPERADMIN_PASSWORD = '@Pythonboss';
const JWT_SECRET = 'super-secret-key'; // Use your actual secret

// Superadmin login
export const loginSuperadmin = async (req, res) => {
  const { id, password } = req.body;
  if (id === SUPERADMIN_ID && password === SUPERADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'superadmin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
};

// Fetch pending admin requests
export const getAdminRequests = async (req, res) => {
  const pendingAdmins = await Admin.find({ status: 'pending' });
  res.status(200).json(pendingAdmins);
};

// Approve or reject admin request
export const handleAdminRequest = async (req, res) => {
  const { id, action } = req.body;
  const admin = await Admin.findById(id);
  if (!admin) return res.status(404).json({ message: 'Admin not found' });

  admin.status = action === 'approve' ? 'approved' : 'rejected';
  await admin.save();
  res.status(200).json({ message: `Admin ${action}ed successfully` });
};
