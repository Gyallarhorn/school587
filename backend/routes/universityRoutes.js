import express from 'express';
import { getAllUniversities } from '../controllers/universityContoller.js';

const router = express.Router();

router.get('/', getAllUniversities);

export default router;
