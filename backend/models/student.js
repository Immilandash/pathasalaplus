import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  whatsappNumber: { type: String, required: true,  max: 10 },
  altMobileNumber: { type: String, required: true, max: 10 },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true, max: 12 },
  fatherName: { type: String, required: true, unique: true },
  campusNumber: { type: Number, required: true },
  seatNumber: { type: Number, required: true, unique: true },
  date: { type: String, required: true},
  profilePicture: { type: String },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);
export default Student;
