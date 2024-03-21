import PropTypes from 'prop-types';
import './index.css';

const keyMap = {
  year: 'Год выпуска:',
  letter: 'Класс:',
  email: 'Электронная почта:',
  social: 'Социальная сеть:',
  almaMater: 'Место учебы:',
  position: 'Должность:',
  workplace: 'Место работы:',
  success: 'Что для Вас успех?',
  isSuccess: 'Считаете ли Вы себя успешным человеком?',
  achievement: 'Перечислите три своих главных достижения в жизни',
  defineSuccess: 'Как изменилось Ваше представление об успехе с момента выпуска из школы?',
  successSource: 'Что помогло Вам добиться успеха?',
  mistakes: 'Были ли ошибки, которые помогли Вам добиться успеха?',
  wish: 'Ваше пожелание Гимназии',
  wishToGraduates: 'Ваше пожелание выпускникам Гимназии',
};

const ContentList = ({ objectKey, value, bottom = false }) => {
  return (
    <div className={`content-list-wrapper ${bottom ? 'additional-list-wrapper' : ''}`}>
      <dt className={`content-term ${bottom ? 'content-term-additional' : ''}`}>{keyMap[objectKey]}</dt>
      <dd className={`content-definition ${bottom ? 'content-definition-additional' : ''}`}>
        {objectKey === 'email' ? (
          <a className='user-card-link' href={`mailto:${value}`}>{value}</a>
        ) : objectKey === 'social' ? (
          <a className='user-card-link' href={value} target='_blank' rel="noreferrer noopener">{value}</a>
        ) : (
          value
        )}
      </dd>
    </div >
  );
};


ContentList.propTypes = {
  objectKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  bottom: PropTypes.bool,
};


export default ContentList;
