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
];

const Filter = () => {
  const [isActive, setActive] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const filter = useSelector((state) => state.users.filter);
  const dispatch = useDispatch();
  const { data: activities, isSuccess, isError } = useFetchEcomonicActivitiesQuery();
  const { data: universities, isSuccess: isSuccessUniversities } = useDelayedApiQuery(filter.universityValue, 500);

  if (isError) {
    toast.error('Не удалось получить экономическую деятельность');
  }

  const handleFocus = () => {
    setActive(true);
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

    if (filter.university && universities.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleFieldsetClick = (e) => {
    if (e.target.closest('.popup-option')) {
      setOpen(false);
      dispatch(setUsersFilter({
        query: e.target.textContent,
        universityValue: e.target.textContent,
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
      economic: (filter.economic === 'Сфера деятельности' ? '' : filter.economic),
      page: 1,
    };

    dispatch(setQuery(searchObject));
  };


  return (
    <form className='form' onSubmit={(e) => handleSubmit(e)}>
      <fieldset
        className={`search-area ${isActive ? 'active' : ''}`}
        onPointerDown={(e) => handleFieldsetClick(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <SearchIcon />
        <label className='visually-hidden' htmlFor='search'>Поле поиска</label>
        <input
          type="text"
          className='input'
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            handleUniversityChange();
            handleChange(e);
          }}
          value={filter.query}
          id='search'
          name='query'
        />
        <button className='button' type='submit'>Искать</button>
        {isSuccessUniversities && <PopUp
          isOpen={isOpen}
          isDefault={false}
          nameValue='univeristy'
          data={universities}
          style={{ top: '50px' }}
        />}
      </fieldset>
      <Select
        field='ФИО'
        data={catogories}
        isSuccess={true}
        defaultName='name'
      />
      <Select
        field='Сфера деятельности'
        data={activities}
        isSuccess={isSuccess}
        nameValue='economic'
        defaultName='economic'
      />
    </form >
  );
};


export default Filter;
