import path from 'path';
import multer from 'multer';
import express from 'express';
import sharp from 'sharp';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const noExtensionFile = path.basename(file.originalname, extname);
    cb(null, `${noExtensionFile}-${Date.now()}.webp`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpe?g|webp|png$/;
  const mimeTypes = /image\/jpe?g|image\/webp|image\/png$/;

  const extname = path.extname(file.originalname);
  const { mimetype } = file;
  console.log(mimetype);
  console.log(extname);

  if (fileTypes.test(extname) && mimeTypes.test(mimetype)) {
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

    let imagePath = req.file.path;

    if (req.file.mimetype !== 'image/webp') {
      const webpBuffer = await sharp(req.file.path).webp({ quality: 85 }).toBuffer();
      imagePath = imagePath.replace(/\.[^.]+$/, '.webp');
      await sharp(webpBuffer).toFile(imagePath);
    }
    return res.status(200).json({ photo: `/${imagePath}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Возникла ошибка в загрузке файла. Попробуйте позднее' });
  }
});

export default router;
