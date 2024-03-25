import User from '../models/User.js';

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
        $match: { economicActivity: economic },
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
        // $expr: { $gt: [{ $size: '$photo' }, 0] },
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
    name, letter, year, phone, email,
  } = req.body;

  if (!name || !letter || !year || !phone || !email) {
    return res.status(400).json({ message: 'Пожалуйста, заполните все обязательные поля' });
  }

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({ message: 'Выпускник уже зарегистрирован в системе' });
  }

  try {
    const newUser = new User({ ...req.body });
    await newUser.save();

    return res.status(201).json({ message: 'Вы успешно зарегистрировались на платформе' });
  } catch (error) {
    return res.status(400).json({ message: 'Введите корректные данные' });
  }
};

export { getUsers, getUser, createUser };
