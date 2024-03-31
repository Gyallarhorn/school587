import { promises as fsPromises } from 'fs';
import path from 'path';
import User from '../models/User.js';
import cleanData from '../utils/cleanData.js';

const dirname = path.resolve();

const LIMIT = 20;

const getUsers = async (req, res) => {
  try {
    const {
      university,
      name,
      economic,
      letter,
    } = req.query;

    const page = +req.query.page - 1 || 0;
    const year = Number.isNaN(+req.query.year) ? '' : +req.query.year;

    const pipeline = [];

    if (name) {
      const nameParts = name.split(' ').filter((part) => part.trim() !== '');
      const regexNameParts = nameParts.map((part) => `(${part})`).join('.*');

      pipeline.push({
        $match: {
          name: {
            $regex: regexNameParts,
            $options: 'i',
          },
        },
      });
    }

    if (university) {
      pipeline.push({
        $match: { almaMater: university },
      });
    }

    if (economic) {
      pipeline.push({
        $match: { economic },
      });
    }

    if (letter) {
      pipeline.push({
        $match: { letter },
      });
    }

    if (year) {
      pipeline.push({
        $match: { year },
      });
    }

    pipeline.push({
      $match: {
        isPermitted: true,
        isChecked: true,
      },
    });

    const countPipeline = [...pipeline, { $count: 'totalUsers' }];

    pipeline.push({ $project: { phone: 0 } });
    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: LIMIT * page });
    pipeline.push({ $limit: LIMIT });

    const users = await User.aggregate(pipeline);
    const count = await User.aggregate(countPipeline);

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Пользователи не найдены' });
    }

    return res.json(({
      total: count[0].totalUsers,
      page: page + 1,
      users,
    }));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Пользователи не найдены' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-phone');

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const {
    forename, surname, letter, year, phone, email,
  } = req.body;

  if (!forename || !surname || !letter || !year || !phone || !email) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
  }

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    if (req.body.photo) {
      fsPromises.unlink(path.join(dirname, req.body.photo));
    }

    return res.status(400).json({ message: 'Выпускник уже зарегистрирован в системе' });
  }

  const cleanedData = cleanData(req.body);

  try {
    const newUser = new User({ ...cleanedData });
    await newUser.save();

    return res.status(201).json({ message: 'Вы успешно зарегистрировались на платформе' });
  } catch (error) {
    console.log(error);
    if (req.body.photo) {
      fsPromises.unlink(path.join(dirname, req.body.photo));
    }

    return res.status(400).json({ message: 'Не удалось создать нового пользователя' });
  }
};

export { getUsers, getUser, createUser };
