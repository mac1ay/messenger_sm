import express from 'express';
import { login, refreshTokens } from '../controllers/authController.js';
import { register } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshTokens);
export default router;