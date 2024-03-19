import University from '../models/University.js';

const LIMIT = 10;

const getAllUniversities = async (req, res) => {
  try {
    const name = req.query.university || '';
    const universities = await University
      .find({ name: { $regex: name, $options: 'i' } })
      .limit(LIMIT);

    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить учебные заведения' });
  }
};

export { getAllUniversities };
