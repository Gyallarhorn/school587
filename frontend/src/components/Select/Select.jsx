import PropTypes from 'prop-types';
import { useState } from 'react';
import Arrow from '../../assets/arrow.svg?react';
import { useDispatch } from 'react-redux';
import './index.css';
import { setUsersFilter } from '../../redux/features/users/usersSlice';
import PopUp from '../PopUp/PopUp';

const Select = ({ field, data, isSuccess, nameValue, defaultName }) => {
  const [selectValue, setSelectValue] = useState(field);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDispatch = (e) => {
    if (e.target.name === 'university' || e.target.name === 'year' || e.target.name === 'name') {
      dispatch(setUsersFilter({
        [e.target.name]: true,
      }));
    }

    if (e.target.name === 'economic') {
      dispatch(setUsersFilter({
        [e.target.name]: e.target.textContent,
      }));
    }
  };

  const handleFieldClick = (e) => {
    if (e.target.closest('.select')) {
      setOpen(!isOpen);
    }

    if (e.target.closest('.popup-option')) {
      setSelectValue(e.target.textContent);
      handleDispatch(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setOpen(!isOpen);
    } else if (e.code === 'Escape') {
      setOpen(false);
    }

    if (e.target.closest('.popup-option')) {
      setSelectValue(e.target.textContent);
      handleDispatch(e);
    }
  };

  return (
    <div className='select'
      tabIndex="0"
      onPointerDown={handleFieldClick}
      onKeyDown={handleKeyDown}
    >
      <div className="select-wrapper">
        <span className='select-label'>{selectValue}</span>
        <Arrow />
      </div>
      {isSuccess && <PopUp
        isOpen={isOpen}
        data={data}
        defaultName={defaultName}
        field={field}
        isDefault={true}
        nameValue={nameValue}
      />}
    </div >
  );
};


Select.propTypes = {
  field: PropTypes.string.isRequired,
  defaultName: PropTypes.string.isRequired,
  data: PropTypes.array,
  isSuccess: PropTypes.bool,
  nameValue: PropTypes.string,
};


export default Select;
