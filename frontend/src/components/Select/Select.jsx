import PropTypes from 'prop-types';
import { useState } from 'react';
import Arrow from '../../assets/arrow.svg?react';
import './index.css';
import PopUp from '../PopUp/PopUp';

const Select = ({ field,
  data,
  isSuccess,
  nameValue,
  defaultName,
  isDefault = true,
  onFieldClick,
  registerClassName = false,
}) => {
  const [selectValue, setSelectValue] = useState(field);
  const [isOpen, setOpen] = useState(false);

  const handleFieldClick = (e) => {
    if (e.target.closest('.select')) {
      setOpen(!isOpen);
    }

    if (e.target.closest('.popup-option')) {
      setSelectValue(e.target.textContent);
      onFieldClick(e);
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
      onFieldClick(e);
    }
  };

  return (
    <div className={`select ${registerClassName ? 'register' : ''}`}
      tabIndex="0"
      onPointerDown={handleFieldClick}
      onKeyDown={handleKeyDown}
    >
      <div className="select-wrapper">
        <span className="select-label">{selectValue}</span>
        <Arrow />
      </div>
      {isSuccess && <PopUp
        isOpen={isOpen}
        data={data}
        defaultName={defaultName}
        field={field}
        isDefault={isDefault}
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
  isDefault: PropTypes.bool,
  onFieldClick: PropTypes.func,
  registerClassName: PropTypes.bool,
};


export default Select;
