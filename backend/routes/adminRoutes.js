import express from 'express';
import { createAdmin, loginAdmin, logoutAdmin } from '../controllers/adminController.js';
import {
  deleteUser,
  getNewUsers,
  getUserByAdmin,
  getllCheckedUsers,
  updateUser,
} from '../controllers/userController.js';
import authenticateAdmin from '../middlewares/authenticate.js';

const router = express.Router();

router.post('/', createAdmin);
router.post('/auth', loginAdmin);
router.post('/logout', logoutAdmin);

router.get('/get-all-users', authenticateAdmin, getllCheckedUsers);
router.get('/new-users', authenticateAdmin, getNewUsers);
router.get('/specific-user/:id', authenticateAdmin, getUserByAdmin);
router.put('/update-user/:id', authenticateAdmin, updateUser);
router.delete('/delete-user/:id', authenticateAdmin, deleteUser);

export default router;
