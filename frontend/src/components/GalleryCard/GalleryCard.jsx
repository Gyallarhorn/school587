import PropTypes from 'prop-types';
import plug from '../../assets/plug.webp';
import { Link } from 'react-router-dom';
import './index.css';


const GalleryCard = ({ user }) => {
  const processedPhoto = `http://localhost:3000${user.photo.length > 0 ? user.photo[0] : ''}`;
  return (
    <figure className='figure' tabIndex='0'>
      <img className='user-image' src={`${user.photo.length > 0 ? processedPhoto : plug}`} alt={`Выпуск ${user.year}, ${user.letter} класс`} />
      <figcaption className='figcaption'>
        <Link className='user-link' to={`users/${user._id}`}>{user.name}</Link>
      </figcaption>
    </figure >
  );
};


GalleryCard.propTypes = {
  user: PropTypes.object.isRequired,
};


export default GalleryCard;
