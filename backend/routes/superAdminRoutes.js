import express from 'express';
import { loginSuperadmin, getAdminRequests, handleAdminRequest } from '../controllers/superAdminController.js';

const router = express.Router();

// Superadmin login
router.post('/login', loginSuperadmin);

// Get admin requests
router.get('/admin-requests', getAdminRequests);

// Approve or reject admin requests
router.post('/admin-request', handleAdminRequest);

export default router;
