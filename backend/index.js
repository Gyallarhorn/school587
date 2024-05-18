import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';

import connectDB from './config/db.js';
import universityRoutes from './routes/universityRoutes.js';
import activitityRoutes from './routes/activityRoutes.js';
import userRoutes from './routes/userRoutes.js';
import UploadsRoutes from './routes/uploadsRoutes.js';
import AdminRoutes from './routes/adminRoutes.js';

// Configuration
dotenv.config();
connectDB();

const dirname = path.resolve();
const UPLOADS_FOLDER = 'uploads';
const UPLOADS_PATH = path.join(dirname, UPLOADS_FOLDER);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/universities', universityRoutes);
app.use('/api/v1/activities', activitityRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/uploads', UploadsRoutes);
app.use('/api/v1/admin', AdminRoutes);

app.use(`/${UPLOADS_FOLDER}`, express.static(UPLOADS_PATH));

const PORT = process.env.PORT || 80;

app.use(express.static(path.join(dirname, 'dist')));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
