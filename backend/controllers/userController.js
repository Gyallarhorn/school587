import { promises as fsPromises } from 'fs';
import path from 'path';
import User from '../models/User.js';
import { cleanData, findEmptyFields } from '../utils/cleanData.js';
import { usersQuery, receiveUser } from '../utils/usersQuery.js';
import countUsers from '../utils/countUsers.js';

const dirname = path.resolve();

const LIMIT = 20;

const getUsers = async (req, res) => {
  await usersQuery(req, res, LIMIT, {
    $match: {
      isPermitted: true,
      isChecked: true,
    },
  });
};

const getUser = async (req, res) => {
  await receiveUser(req, res, false);
};

const getUserByAdmin = async (req, res) => {
  await receiveUser(req, res, true);
};

const createUser = async (req, res) => {
  const {
    firstName, lastName, letter, year, phone, email,
  } = req.body;

  if (!firstName || !lastName || !letter || !year || !phone || !email) {
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

const getllCheckedUsers = async (req, res) => {
  await usersQuery(req, res, LIMIT, {
    $match: {
      isChecked: true,
    },
  }, true);
};

const getNewUsers = async (req, res) => {
  await usersQuery(req, res, LIMIT, {
    $match: {
      isChecked: false,
    },
  }, true);
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanedData = cleanData(req.body);
    const deletedData = findEmptyFields(cleanedData);
    const updatedData = {
      ...cleanedData,
      isChecked: true,
    };

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedData, $unset: deletedData },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Выпускник не найден' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: 'Произошла ошибка. Попробуйте позднее' });
  }
};

const countNewUsers = async (req, res) => {
  await countUsers(res, {
    $match: {
      isChecked: false,
    },
  });
};

const countCheckedUsers = async (req, res) => {
  await countUsers(res, {
    $match: {
      isChecked: true,
    },
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Выпускник не найден' });
    }

    if (deletedUser?.photo) {
      fsPromises.unlink(path.join(dirname, deletedUser.photo));
    }

    return res.json({ message: 'Выпускник успешно удален' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Произошла ошибка, попробуйте позднее' });
  }
};

export {
  getUsers,
  getUser,
  createUser,
  getllCheckedUsers,
  getNewUsers,
  getUserByAdmin,
  updateUser,
  deleteUser,
  countNewUsers,
  countCheckedUsers,
};
