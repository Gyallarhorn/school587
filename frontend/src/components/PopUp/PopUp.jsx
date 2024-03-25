import PropTypes from 'prop-types';
import './index.css';

const PopUp = ({ isOpen,
  defaultName,
  nameValue,
  field,
  data,
  isDefault }) => {
  return (
    <div
      className={`popup-wrapper ${isOpen ? 'active-popup' : ''}`}
    >
      {isDefault && <button type='button' className="popup-option" name={defaultName}>{field}</button>}
      {data.map((elem) => (
        <button type='button' className='popup-option' key={elem._id} name={`${elem?.nameValue ? elem.nameValue : nameValue}`}>{elem.name}</button>
      ))}
    </div>
  );
};

PopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  field: PropTypes.string,
  defaultName: PropTypes.string,
  data: PropTypes.array,
  nameValue: PropTypes.string,
  isDefault: PropTypes.bool.isRequired,
};

export default PopUp;
