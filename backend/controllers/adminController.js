/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import createToken from '../utils/createToken.js';

const loginAdmin = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Заполните все поля!' });
  }

  const existingAdmin = await Admin.findOne({ login });

  if (existingAdmin) {
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

    if (isPasswordValid) {
      const token = createToken(res, existingAdmin._id);

      res.status(201).json({
        _id: existingAdmin._id,
        login: existingAdmin.login,
        isAdmin: existingAdmin.isAdmin,
        token,
      });
    } else {
      res.status(401).json({ message: 'Введите верные логин и пароль' });
    }
  } else {
    res.status(401).json({ message: 'Вы ввели неверные данные' });
  }
};

export { loginAdmin };
