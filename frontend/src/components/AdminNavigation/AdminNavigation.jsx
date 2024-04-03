import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './index.css';


const AdminNavigation = ({ countNew, countAll }) => {
  return (
    <div className="admin-navigation">
      <div className="admin-navigation-left">
        <NavLink
          to="/admin-panel/checked-users"
          data-count={countAll?.total}
          className="admin-navigation-link"
        >
          Одобренные
        </NavLink>
        <NavLink
          to="/admin-panel/new-users"
          data-count={countNew?.total || 0}
          className={`admin-navigation-link ${countNew?.total > 0 ? 'admin-moderation-link admin-new-link' : ''}`}>На модерации</NavLink>
      </div >
      <NavLink to="admin-panel/edit-universities" className="admin-edit-link">Редактировать ВУЗы</NavLink>
    </div >
  );
};


AdminNavigation.propTypes = {
  countNew: PropTypes.object,
  countAll: PropTypes.object,
};


export default AdminNavigation;
