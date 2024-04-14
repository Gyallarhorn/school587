import PropTypes from 'prop-types';
import plugMobile from '../../assets/plug_mobile.webp';
import plugTablet from '../../assets/plug_tablet.webp';
import plugDekstop from '../../assets/plug_dekstop.webp';
import getDate from '../../utils/getDate';
import { Link } from 'react-router-dom';
import './index.css';


const AdminUser = ({ user, onDeleteUser, isLoading }) => {
  return (
    <tr className="admin-user">
      <td>
        <Link to={`${user._id}`} className="admin-user-link" aria-label={`Переход на карточку выпускника`}>
          {user?.photo
            ? (
              <img className="user-image" src={`${import.meta.env.VITE_BASE_URL}${user.photo}`} alt={`${user.lastName}`} />
            )
            : (
              <picture className="admin-image-container">
                <source media="(min-width: 1280px)" srcSet={plugDekstop} />
                <source media="(min-width: 768px)" srcSet={plugTablet} />
                <img className="user-image" src={plugMobile} alt={`${user.lastName}`} />
              </picture>
            )}
        </Link>
      </td>
      <td>
        <h2 className="admin-user-name">{`${user.lastName}`}<br />{`${user.firstName} ${user.middleName ? user.middleName : ''}`.trim()}</h2>
      </td>
      <td>
        <span className="admin-user-date">{getDate(user.createdAt)}</span>
      </td>
      <td>
        <div className="admit-edit">
          <Link className="admin-edit-button" to={`/admin-panel/edit/${user._id}`} aria-label="Редактировать выпускника"></Link>
          <button disabled={isLoading} onClick={onDeleteUser} className="admin-edit-button" aria-label="Удалить выпускника из базы"></button>
        </div>
      </td>
    </tr>
  );
};


AdminUser.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default AdminUser;
