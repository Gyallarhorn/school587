import path from 'path';
import multer from 'multer';
import express from 'express';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import authenticateAdmin from '../middlewares/authenticate.js';

const dirname = path.resolve();

const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|webp|png$/;
  const mimeTypes = /image\/jpe?g|image\/webp|image\/png$/;

  const extname = path.extname(file.originalname);
  const { mimetype } = file;

  if (fileTypes.test(extname.toLowerCase()) && mimeTypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Images only'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
});
const uploadSingleImage = upload.single('image');

router.post('/', uploadSingleImage, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Изображение не загружено' });
    }

    if (req.file.size > 50 * 1024 * 1024) {
      return res.status(400).json({ message: 'Фото не должно весить больше 50мб' });
    }

    const newPath = `image-${Date.now()}.webp`;

    if (req.file.mimetype !== 'image/webp') {
      await sharp(req.file.buffer)
        .webp({ quality: 85 })
        .toFile(`uploads/${newPath}`);
    } else {
      await sharp(req.file.buffer).toFile(`uploads/${newPath}`);
    }
    return res.status(200).json({ photo: `${path.sep}uploads${path.sep}${newPath}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Возникла ошибка в загрузке файла. Попробуйте позднее' });
  }
});

const deletePhoto = async (req, res) => {
  try {
    if (!req.body.photo) {
      return res.status(400).json({ message: 'Фотография не найдена' });
    }
    await fsPromises.unlink(path.join(dirname, req.body.photo));
    return res.status(200).json({ message: 'Фотография успешно удалена' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка, попробуйте позднее' });
  }
};

router.delete('/delete', authenticateAdmin, deletePhoto);

export default router;
