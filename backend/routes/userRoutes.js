import express from 'express';
import { getUsers } from '../controllers/userController.js';

const router = express.Router();

// Public Routes
router.get('/', getUsers);

export default router;
