import University from '../models/University.js';
import User from '../models/User.js';

const LIMIT = 20;

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

const createUniversity = async (req, res) => {
  try {
    if (!req.body.university) {
      return res.status(400).json({ message: 'Введите название учебного заведения' });
    }
    const { university } = req.body;
    const existingUniversity = await University.findOne({ name: university });
    if (existingUniversity) {
      return res.status(400).json({ message: 'Такое учебное заведение уже существует' });
    }
    const newUniversity = new University({ name: university });
    await newUniversity.save();

    return res.status(201).json({ message: 'Учебное заведение добавлено в базу' });
  } catch (error) {
    return res.status(400).json({ message: 'Не удалось создать учебное заведение' });
  }
};

const updateUniversity = async (req, res) => {
  try {
    if (!req.body.university) {
      return res.status(400).json({ message: 'Введите название учебного заведения' });
    }
    const { university } = req.body;
    const { id } = req.params;
    const updatedUniversity = await University.findByIdAndUpdate(
      id,
      { name: university },
      { new: false },
    );

    if (!updatedUniversity) {
      return res.status(404).json({ message: 'Учебное заведение не найдено' });
    }

    await User.updateMany(
      { almaMater: updatedUniversity.name },
      { $set: { almaMater: university } },
    );

    return res.json({ message: 'Учебное заведение успешно обновлено' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Не удалось обновить учебное заведение' });
  }
};

const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);

    if (!deletedUniversity) {
      return res.status(404).json({ message: 'Учебное заведение не найдено' });
    }

    await User.updateMany(
      { almaMater: deletedUniversity.name },
      { $unset: { almaMater: 1 } },
    );

    return res.status(200).json({ message: 'Учебное заведение успешно удалено' });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: 'Не удалось удалить учебное заведение' });
  }
};

export {
  getAllUniversities,
  createUniversity,
  updateUniversity,
  deleteUniversity,
};
