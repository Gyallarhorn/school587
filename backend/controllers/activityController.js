import Activity from '../models/EconomicActivity.js';

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity
      .find()
      .sort({ name: 1 });

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить экономическую деятельность' });
  }
};

export { getAllActivities };
