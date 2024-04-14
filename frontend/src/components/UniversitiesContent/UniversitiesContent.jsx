import PropTypes from 'prop-types';
import './index.css';
import Pagination from '../Pagination/Pagination';


const UniversitiesContent = ({ data, onDelete, isLoading, onHandlePopup }) => {
  return (
    <>
      <table className="admin-content">
        <thead className="admin-content-top">
          <tr>
            <th className="admin-headers">Учебное заведение</th>
            <th className="admin-headers">Панель управления</th>
          </tr>
        </thead>
        <tbody>
          {data.universities.map((elem) => (
            <tr className="admin-user" key={elem._id}>
              <td className="table-name-data">
                <h2 className="admin-user-name">{elem.name}</h2>
              </td>
              <td className="table-edit-data">
                <div className="admit-edit">
                  <button
                    onClick={() => onHandlePopup({
                      name: elem.name,
                      _id: elem._id,
                      type: 'update',
                    })}
                    className="admin-edit-button"
                    aria-label="Редактировать учебное заведение"
                  ></button>
                  <button
                    disabled={isLoading}
                    onClick={() => onDelete(elem._id)}
                    className="admin-edit-button"
                    aria-label="Удалить учебное заведение из базы"
                  ></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.universities.length > 20 &&
        <Pagination
          totalCount={data.count}
          currentPage={data.page}
          pageSize={20}
          siblingCount={1}
        />
      }
    </>
  );
};


UniversitiesContent.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onHandlePopup: PropTypes.func.isRequired,
};


export default UniversitiesContent;
