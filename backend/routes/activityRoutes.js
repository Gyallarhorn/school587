import express from 'express';
import { getAllActivities } from '../controllers/activityController.js';

const router = express.Router();

router.get('/', getAllActivities);

export default router;
