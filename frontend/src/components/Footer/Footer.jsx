import './index.css';
import Logo from '../../assets/logo.svg?react';

const Footer = () => {
  return (
    <>
      <h2 className='main-header footer-header'>Контакты</h2>
      <footer className="footer">
        <Logo className='footer-logo' />
        <div className="footer-wrapper deputy">
          <h3 className="footer-title">Заместитель директора по&nbsp;воспитательной работе:</h3>
          <a href="https://vk.com/id2847360" className="deputy-link" target='_blank'>Дружук Ольга Николаевна</a>
          <p className="footer-content deputy-content">
            <span className="footer-text">Почта:</span>
            <a className="footer-link" href="mailto:druj@gimnazia587.ru">druj@gimnazia587.ru</a>
          </p>
        </div>
        <div className="footer-wrapper secretary">
          <h3 className="footer-title">Секретарь директора:</h3>
          <p className="footer-content">
            <span className="footer-text">Телефон: </span>
            <a className="footer-link secretary-link" href="tel:+78127017653">+7  (812) 701-76-53</a>
          </p>
          <p className="footer-content">
            <span className="footer-text">Почта: </span>
            <a className="footer-link secretary-link" href="mailto:info.sch587@obr.gov.spb.ru">info.sch587@obr.gov.spb.ru</a>
          </p>
        </div>
        <div className="footer-wrapper website">
          <h3 className="footer-title">Сайт Гимназии:</h3>
          <a className="footer-link" href="http://www.school587.spb.ru/" target='_blank' rel="noreferrer noopener">http://www.school587.spb.ru</a>
        </div>
        <div className="footer-wrapper creators">
          <h3 className="footer-title">Создали:</h3>
          <a className="footer-link creator-link" href="https://github.com/Gyallarhorn" target='_blank' rel="noreferrer noopener">Рыженко Артем (веб разработчик)</a>
          <a className="footer-link creator-link" href="https://github.com/Gyallarhorn" target='_blank' rel="noreferrer noopener">Гергиль Вероника (веб дизайнер)</a>
        </div>
        <p className="copyright">&copy;&nbsp;Выпускники Гимназии 587 Фрунзенского района Санкт-Петербурга. Все права защищены.</p>
      </footer>
    </>
  );
};

export default Footer;
