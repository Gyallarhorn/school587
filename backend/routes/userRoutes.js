import express from 'express';
import {
  createUser, getUser, getUsers,
} from '../controllers/userController.js';

const router = express.Router();

// Public Routes
router.route('/')
  .post(createUser)
  .get(getUsers);
router.get('/:id', getUser);

export default router;
