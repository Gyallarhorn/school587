import express from 'express';
import { createAdmin, loginAdmin } from '../controllers/adminController.js';
import {
  countCheckedUsers,
  countNewUsers,
  deleteUser,
  getNewUsers,
  getUserByAdmin,
  getllCheckedUsers,
  updateUser,
} from '../controllers/userController.js';
import authenticateAdmin from '../middlewares/authenticate.js';
import { createUniversity, deleteUniversity, updateUniversity } from '../controllers/universityContoller.js';

const router = express.Router();

router.post('/', createAdmin);
router.post('/auth', loginAdmin);

router.get('/get-all-users', authenticateAdmin, getllCheckedUsers);
router.get('/count-new-users', authenticateAdmin, countNewUsers);
router.get('/count-checked-users', authenticateAdmin, countCheckedUsers);
router.get('/new-users', authenticateAdmin, getNewUsers);
router.get('/specific-user/:id', authenticateAdmin, getUserByAdmin);
router.put('/update-user/:id', authenticateAdmin, updateUser);
router.delete('/delete-user/:id', authenticateAdmin, deleteUser);

router.post('/create-university', authenticateAdmin, createUniversity);
router.put('/update-university/:id', authenticateAdmin, updateUniversity);
router.delete('/delete-university/:id', authenticateAdmin, deleteUniversity);

export default router;
