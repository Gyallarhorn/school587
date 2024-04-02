import PropTypes from 'prop-types';
import AdminUser from '../AdminUser/AdminUser';
import './index.css';


const AdminContent = ({ data, onDelete }) => {
  return (
    <table className="admin-content">
      <thead className="admin-content-top">
        <tr>
          <th colSpan={2} className="admin-headers">фио</th>
          <th className="admin-headers">дата добавления</th>
          <th className="admin-headers">управление профилем</th>
        </tr>
      </thead>
      <tbody>
        {data.map((elem) => <AdminUser
          key={elem._id}
          user={elem}
          onDeleteUser={() => onDelete(elem._id)}
        />)}
      </tbody>
    </table>
  );
};


AdminContent.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
};


export default AdminContent;
