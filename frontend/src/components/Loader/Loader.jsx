import './index.css';
import PropTypes from 'prop-types';

const Loader = ({ universities = false }) => {
  return <span className={`loader ${universities ? 'loader-universities' : ''}`.trim()}></span>;
};

Loader.propTypes = {
  universities: PropTypes.bool,
};

export default Loader;
