// models/Setup.js
import mongoose from 'mongoose';

const setupSchema = new mongoose.Schema({
  brandName: String,
  logo: String, // Path to the logo image
  themeColor: String,
  annualTargetStudents: Number,
  annualTargetIncome: Number,
  socialMediaLinks: {
    twitter: String,
    instagram: String,
    youtube: String,
  },
  contactInfo: {
    whatsappNumber: String,
    landline: String,
    email: String,
    address: String,
  },
  aboutUs: String,
  sliders: [String], // Array of image paths
});

export default mongoose.model('Setup', setupSchema);
