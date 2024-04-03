import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo.svg?react';
import LoginIcon from '../../assets/login.svg?react';
import { NavLink, Link } from "react-router-dom";
import { createPortal } from 'react-dom';

import './index.css';
import { useState } from 'react';
import AdminPopup from '../AdminPopup/AdminPopup';
import { logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const Navigation = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    toast.success('Вы успешно вышли из системы');
  };

  return (
    <>
      <header className={`header ${adminInfo?.isAdmin ? 'header-admin' : ''}`.trim()}>
        <nav className="header-nav">
          <Link to="/" className="header-link-icon logo-link" aria-label="Логотип">
            <Logo className="logo-icon" />
          </Link>
          <div className="header-content">
            {adminInfo && <NavLink className="header-link" to="/admin-panel/checked-users" >Панель</NavLink>}
            <NavLink className="header-link" to="/register">Регистрация</NavLink>
          </div>
          <button
            className="header-link-icon header-link-login"
            aria-label="Вход для администратора"
            onClick={() => setPopupOpen(true)}
          >
            <LoginIcon className="login-icon" />
          </button>
          <button
            className="header-link-icon header-link-admin"
            aria-label="Выйти из системы"
            onClick={handleClick}
          >
            <LoginIcon className="login-icon" />
          </button>
        </nav>
      </header>
      {isPopupOpen && createPortal(
        <AdminPopup
          isOpen={isPopupOpen}
          onPopupOpen={setPopupOpen}
        />, document.body)}
    </>

  );
};

export default Navigation;
