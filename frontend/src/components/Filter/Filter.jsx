import { useFetchEcomonicActivitiesQuery } from '../../redux/api/activities';
import Select from '../Select/Select';
import './index.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setUsersFilter } from '../../redux/features/users/usersSlice';
import { useState } from 'react';
import useDelayedApiQuery from '../../hooks/useDelayedApiQuery';
import PopUp from '../PopUp/PopUp';
import SearchIcon from '../../assets/search.svg?react';
import { letters } from '../../utils/constants';

const catogories = [
  {
    _id: '1710666384873',
    name: 'ВУЗ',
    nameValue: 'university',
  },
  {
    _id: '1710666396357',
    name: 'Год выпуска',
    nameValue: 'year',
  },
  {
    _id: '1711194899661',
    name: 'Сфера деятельности',
    nameValue: 'economic',
  },
];

const Filter = () => {
  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const filter = useSelector((state) => state.users.filter);
  const dispatch = useDispatch();
  const { data: activities, isSuccess: isSuccessEconomic, isError } = useFetchEcomonicActivitiesQuery();
  const { data: universities, isSuccess: isSuccessUniversities } = useDelayedApiQuery(filter.universityValue, 500);

  if (isError) {
    toast.error('Не удалось получить экономическую деятельность');
  }

  const handleFocus = () => {
    setActive(true);

    if (filter.economic && activities.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleBlur = () => {
    setActive(false);
  };

  const handleChange = (e) => {
    if (filter.university) {
      dispatch(setUsersFilter({
        universityValue: e.target.value,
        [e.target.name]: e.target.value,
      }));
    } else {
      dispatch(setUsersFilter({
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUniversityChange = () => {
    if (!filter.university) {
      return;
    }

    if ((filter.university && universities.length > 0)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleFieldsetClick = (e) => {
    if (e.target.closest('.popup-option') && filter.university) {
      setOpen(false);
      dispatch(setUsersFilter({
        query: e.target.textContent,
        universityValue: e.target.textContent,
      }));
    }
    if (e.target.closest('.popup-option') && filter.economic) {
      setOpen(false);
      dispatch(setUsersFilter({
        query: e.target.textContent,
        economicValue: e.target.textContent,
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      handleFieldsetClick(e);
    }

    if (e.code === 'Escape') {
      setOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkedField = Object.keys(filter).filter((elem) => {
      if (typeof filter[elem] === 'boolean' && filter[elem]) {
        return true;
      }
      return false;
    });

    const searchObject = {
      [checkedField[0]]: filter.query,
      letter: (filter.letter === 'Класс' ? '' : filter.letter),
      page: 1,
    };

    dispatch(setQuery(searchObject));
  };

  const handleSelectClick = (e) => {
    if (e.target.name === 'university' || e.target.name === 'year' || e.target.name === 'name' || e.target.name === 'economic') {
      dispatch(setUsersFilter({
        [e.target.name]: true,
      }));
    }

    if (e.target.name === 'letter') {
      dispatch(setUsersFilter({
        [e.target.name]: e.target.textContent,
      }));
    }
  };


  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <fieldset
        className={`search-area ${isActive ? 'active' : ''}`}
        onPointerDown={(e) => handleFieldsetClick(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <SearchIcon />
        <label className="visually-hidden" htmlFor="search">Поле поиска</label>
        <input
          type="text"
          className="input"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleUniversityChange();
            handleChange(e);
          }}
          placeholder={`${filter.university ? 'Введите свой ВУЗ' : ''}`}
          value={filter.query}
          id="search"
          name="query"
        />
        <button className="button" type="submit">Искать</button>
        {isSuccessUniversities && filter.university && <PopUp
          isOpen={isOpen}
          isDefault={false}
          nameValue="univeristy"
          data={universities}
          style={{ top: '50px' }}
        />}
        {isSuccessEconomic && filter.economic && <PopUp
          isOpen={isOpen}
          isDefault={false}
          nameValue="economic"
          data={activities}
          style={{ top: '50px' }}
        />}
      </fieldset>
      <Select
        field="ФИО"
        data={catogories}
        isSuccess={true}
        defaultName="name"
        onFieldClick={(e) => handleSelectClick(e)}
      />
      <Select
        field="Класс"
        data={letters}
        isSuccess={true}
        nameValue="letter"
        defaultName="letter"
        onFieldClick={(e) => handleSelectClick(e)}
      />
    </form >
  );
};


export default Filter;
