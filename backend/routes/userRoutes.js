import express from 'express';
import { getUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

// Public Routes
router.get('/', getUsers);
router.get('/specific-user/:id', getUser);

export default router;
