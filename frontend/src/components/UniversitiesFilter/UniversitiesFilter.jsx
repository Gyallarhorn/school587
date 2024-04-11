import PropTypes from 'prop-types';
import SearchIcon from '../../assets/search.svg?react';
import AddIcon from '../../assets/add.svg?react';
import './index.css';
import { useState } from 'react';

const UniversitiesFilter = ({ onClickButton, onHandlePopup }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="universitites-search-wrapper">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onClickButton(inputValue);
        }}
      >
        <fieldset
          className={`search-area `}
        >
          <SearchIcon />
          <label className="visually-hidden" htmlFor="search">Поле поиска</label>
          <input
            type="text"
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="search"
            name="query"
          />
          <button className="button" type="submit">Искать</button>
        </fieldset>
      </form>
      <button
        className="universities-search-button"
        onClick={() => onHandlePopup({
          name: '',
          _id: '',
          type: 'add',
        })}
      >
        <AddIcon />
        <span>Добавить</span>
      </button>
    </div>
  );
};

UniversitiesFilter.propTypes = {
  onClickButton: PropTypes.func.isRequired,
  onHandlePopup: PropTypes.func.isRequired,
};



export default UniversitiesFilter;
