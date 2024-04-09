import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import connectDB from './config/db.js';
import universityRoutes from './routes/universityRoutes.js';
import activitityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import UploadsRoutes from './routes/uploadsRoutes.js';
import AdminRoutes from './routes/adminRoutes.js';
import { initEcomonics, initUniversities, initUsers } from './mockData/initiate.js';
// import createFolder from './utils/createFolder.js';

// Configuration
dotenv.config();
connectDB();

const dirname = path.resolve();
const UPLOADS_FOLDER = 'uploads';
const UPLOADS_PATH = path.join(dirname, UPLOADS_FOLDER);

// Mock data and uploads folder

// createFolder(UPLOADS_PATH);
// initUniversities();
// initUsers();
// initEcomonics();

const app = express();

// Middlewares
app.use(express.json());

const whitelist = ['http://80.90.184.234:3050/'];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/universities', universityRoutes);
app.use('/api/v1/activities', activitityRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/uploads', UploadsRoutes);
app.use('/api/v1/admin', AdminRoutes);

app.use(`/${UPLOADS_FOLDER}`, express.static(UPLOADS_PATH));
app.use(express.static(path.join(dirname, 'dist')));

const PORT = process.env.PORT || 3050;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
