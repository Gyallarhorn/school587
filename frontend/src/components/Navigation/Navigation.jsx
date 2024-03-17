import { useSelector } from 'react-redux';
import Logo from '../../assets/logo.svg?react';
import LoginIcon from '../../assets/login.svg?react';
import { NavLink, Link } from "react-router-dom";

import './index.css';


const Navigation = () => {
  const { adminInfo } = useSelector((state) => state.auth);

  return (
    <header className='header'>
      <nav className="header-nav">
        <Link to='/' className='header-link-icon logo-link' aria-label="Логотип">
          <Logo className='logo-icon' />
        </Link>
        <div className="header-content">
          {adminInfo && <NavLink className='header-link' to='/admin-panel' >Панель</NavLink>}
          <NavLink className='header-link' to='/register'>Регистрация</NavLink>
        </div>
        <button className={`header-link-icon ${adminInfo ? 'header-link-admin' : ''}`} aria-label="Вход для администратора">
          <LoginIcon className='login-icon' />
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
