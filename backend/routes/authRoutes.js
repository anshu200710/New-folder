import express from 'express';
import { register, login, getUserProfile, adminOnlyContent } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUserProfile);
router.get('/admin', authMiddleware, adminMiddleware, adminOnlyContent);

export default router;
