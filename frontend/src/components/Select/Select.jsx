import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Arrow from '../../assets/arrow.svg?react';
import './index.css';
import PopUp from '../PopUp/PopUp';
import { useSelector } from 'react-redux';

const Select = ({ field,
  data,
  isSuccess,
  nameValue,
  defaultName,
  isDefault = true,
  onFieldClick,
  registerClassName = false,
  registerData,
}) => {
  const [selectValue, setSelectValue] = useState(field);
  const [isOpen, setOpen] = useState(false);
  const { filter } = useSelector((state) => state.users);

  const handleFieldClick = (e) => {
    if (e.target.closest('.select')) {
      setOpen(!isOpen);
    }

    if (e.target.closest('.popup-option')) {
      setSelectValue(e.target.textContent);
      onFieldClick(e);
    }
  };

  useEffect(() => {
    const filterToSelectValueMap = {
      university: 'ВУЗ',
      year: 'Год выпуска',
      economic: 'Сфера деятельности',
      name: 'ФИО',
    };

    const matchedFilter = Object.keys(filterToSelectValueMap).find((key) => filter[key]);

    if (filter.letter && nameValue === 'letter') {
      setSelectValue(filter.letter);
    } else {
      setSelectValue('Класс');
    }

    if (matchedFilter && nameValue !== 'letter') {
      setSelectValue(filterToSelectValueMap[matchedFilter]);
    }

    if (registerClassName && nameValue === 'economic') {
      setSelectValue('Сфера деятельности');
    }
  }, []);


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
        <span className="select-label">{registerData && registerData !== '' ? registerData : selectValue}</span>
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
  registerData: PropTypes.string,
};


export default Select;
