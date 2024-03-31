import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const authenticateAdmin = async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Вы не авторизованы!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.userId).select('-password-');
    if (req.admin && req.admin.isAdmin) {
      next();
    } else {
      res.status(401).json({ message: 'Вы не авторизованы как администратор' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Вы не авторизованы. Войдите в систему заново' });
  }
};

export default authenticateAdmin;
