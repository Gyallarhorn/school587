import express from 'express';
import { getUser, getUsers } from '../controllers/userController.js';

const router = express.Router();

// Public Routes
router.get('/', getUsers);
router.get('/:id', getUser);

export default router;
