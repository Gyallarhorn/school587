/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import createToken from '../utils/createToken.js';

const createAdmin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля!' });
  }

  const adminExists = await Admin.findOne({ login });

  if (adminExists) {
    return res.status(400).json({ message: 'Администратор уже существует' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAdmin = new Admin({ login, password: hashedPassword, isAdmin: true });

  try {
    await newAdmin.save();
    createToken(res, newAdmin._id);

    res.status(201).json({
      _id: newAdmin._id,
      login: newAdmin.login,
      isAdmin: newAdmin.isAdmin,
    });
  } catch (error) {
    return res.status(400).json({ message: 'Введены неверные данные' });
  }
};

const loginAdmin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля!' });
  }

  const existingAdmin = await Admin.findOne({ login });

  if (existingAdmin) {
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

    if (isPasswordValid) {
      createToken(res, existingAdmin._id);

      res.status(201).json({
        _id: existingAdmin._id,
        login: existingAdmin.login,
        isAdmin: existingAdmin.isAdmin,
      });
    } else {
      res.status(401).json({ message: 'Введите верные логин и пароль' });
    }
  } else {
    res.status(401).json({ message: 'Вы ввели неверные данные' });
  }
};

const logoutAdmin = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Вы успешно вышли из системы' });
};

export { createAdmin, loginAdmin, logoutAdmin };
