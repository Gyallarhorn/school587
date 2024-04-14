import { useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { useCreateUniversityMutation, useUpdateUniversityMutation } from '../../redux/api/admin';
import { toast } from 'react-toastify';

const UniversityPopup = ({ popupData, onClosePopup, onRefetch }) => {
  const [university, setUniversity] = useState(popupData.name);
  const [addUniversity, { isLoading: isLoadingCreating }] = useCreateUniversityMutation();
  const [updateUniversity, { isLoading: isLoadingUpdating }] = useUpdateUniversityMutation();

  const handleCreateUniversity = async () => {
    try {
      if (!university) {
        toast.error('Пожалуйста, введите название заведения');
        return;
      }

      const res = await addUniversity({ university });

      if (res.error) {
        throw new Error(res.error.data.message);
      }

      toast.success(res.data.message);
      onClosePopup();
      onRefetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateUniversity = async () => {
    try {
      if (!university) {
        toast.error('Пожалуйста, введите название заведения');
        return;
      }

      const res = await updateUniversity({
        id: popupData._id,
        updatedUniversity: { university },
      });

      if (res.error) {
        throw new Error(res.error.data.message);
      }

      toast.success(res.data.message);
      onClosePopup();
      onRefetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="university-popup-wrapper">
      <div className="university-popup">
        <button className="university-popup-close" aria-label="Закрыть" onClick={onClosePopup}></button>
        <label className="university-popup-label" htmlFor="query">Введите полное название учебного заведения</label>
        <input
          type="text"
          className="input add-university-input"
          placeholder="Название (аббревиатура)"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          id="query"
          name="query"
        />
        {popupData.type === 'add' ?
          <button disabled={isLoadingCreating} onClick={handleCreateUniversity} className="unviersity-popup-button">Добавить</button>
          :
          <button disabled={isLoadingUpdating} onClick={(handleUpdateUniversity)} className="unviersity-popup-button">Обновить</button>
        }
      </div>
    </div>

  );
};

UniversityPopup.propTypes = {
  popupData: PropTypes.object.isRequired,
  onClosePopup: PropTypes.func.isRequired,
  onRefetch: PropTypes.func.isRequired,
};

export default UniversityPopup;
