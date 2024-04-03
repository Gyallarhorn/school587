import User from '../models/User.js';

const countUsers = async (res, options) => {
  try {
    const pipeline = [];

    pipeline.push({
      ...options,
    });

    const countPipeline = [...pipeline, { $count: 'totalUsers' }];
    const count = await User.aggregate(countPipeline);

    return res.json(({
      total: count[0]?.totalUsers,
    }));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Пользователи не найдены' });
  }
};

export default countUsers;
