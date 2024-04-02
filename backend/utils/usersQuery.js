import User from '../models/User.js';

const usersQuery = async (req, res, limit, options, allInfo = false) => {
  try {
    const {
      university,
      name,
      economic,
      letter,
    } = req.query;

    const page = +req.query.page - 1 || 0;
    const year = Number.isNaN(req.query.year) ? '' : +req.query.year;

    const pipeline = [];

    if (name) {
      const nameParts = name.split(' ').filter((part) => part.trim() !== '');
      const regexNameParts = nameParts.map((part) => `(${part})`).join('.*');

      pipeline.push({
        $match: {
          fullName: {
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
      ...options,
    });

    const countPipeline = [...pipeline, { $count: 'totalUsers' }];

    if (!allInfo) {
      pipeline.push({ $project: { phone: 0 } });
    }

    pipeline.push({ $sort: { createdAt: -1 } });
    pipeline.push({ $skip: limit * page });
    pipeline.push({ $limit: limit });

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

const receiveUser = async (req, res, isAdmin) => {
  try {
    let user;

    if (isAdmin) {
      user = await User.findById(req.params.id);
    } else {
      user = await User.findById(req.params.id).select('-phone');
    }

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { usersQuery, receiveUser };
