import PropTypes from 'prop-types';
import plugMobile from '../../assets/plug_mobile.webp';
import plugTablet from '../../assets/plug_tablet.webp';
import plugDekstop from '../../assets/plug_dekstop.webp';
import { Link } from 'react-router-dom';
import './index.css';


const GalleryCard = ({ user }) => {
  return (
    <figure className="figure" tabIndex="0">
      {user?.photo
        ? (
          <img className="user-image" src={`${import.meta.env.VITE_BASE_URL}${user.photo}`} alt={`Выпуск ${user.year}, ${user.letter} класс`} />
        )
        : (
          <picture className="image-container">
            <source media="(min-width: 1280px)" srcSet={plugDekstop} />
            <source media="(min-width: 768px)" srcSet={plugTablet} />
            <img className="user-image" src={plugMobile} alt={`Выпуск ${user.year}, ${user.letter} класс`} />
          </picture>
        )}
      <figcaption className="figcaption">
        <Link className="user-link" to={`users/${user._id}`}>{user.fullName}</Link>
      </figcaption>
    </figure >
  );
};


GalleryCard.propTypes = {
  user: PropTypes.object.isRequired,
};


export default GalleryCard;
