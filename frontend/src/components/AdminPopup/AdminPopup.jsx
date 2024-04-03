import { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { useLoginMutation } from '../../redux/api/admin';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

const AdminPopup = ({ isOpen, onPopupOpen }) => {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });
  const dispatch = useDispatch();

  const [login] = useLoginMutation();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials(res));
      onPopupOpen(false);
      toast.success('Добро пожаловать, администратор');
    } catch (err) {
      toast.error(err.data.message || 'Произошла ошибка, попробуйте позднее');
    }
  };

  return (
    <div className={`admin-wrapper ${isOpen ? 'admin-wrapper-open' : ''}`}>
      <div className="admin-popup">
        <button
          className="admin-popup-close-button"
          aria-label="Закрыть попап"
          onClick={() => onPopupOpen(false)}
        ></button>
        <h2 className="main-header admin-popup-title">Войти в систему</h2>
        <form
          className="login-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="login-form-wrapper">
            <label htmlFor="login" className="login-form-label">Логин</label>
            <input
              type="text"
              className="input register-input"
              placeholder="examplemail@hotmail.com"
              value={formData.login}
              onChange={(e) => handleChange(e)}
              id="login"
              name="login"
              required={true}
              autoComplete="username"
            />
          </div>
          <div className="login-form-wrapper">
            <label htmlFor="password" className="login-form-label">Пароль</label>
            <input
              type="password"
              className="input register-input"
              placeholder="************"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              id="password"
              name="password"
              required={true}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="login-form-button"
            disabled={!formData.login || !formData.password}
          >Войти</button>
        </form>
      </div>
    </div>
  );
};

AdminPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onPopupOpen: PropTypes.func.isRequired,
};

export default AdminPopup;
