import PropTypes from 'prop-types';
import usePagination, { DOTS } from '../../hooks/usePagination';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../../redux/features/users/usersSlice';
import { useEffect } from 'react';


const Pagination = ({ totalCount, currentPage, pageSize, siblingCount = 1 }) => {
  const paginationRange = usePagination(currentPage, totalCount, pageSize, siblingCount);
  const { query } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  const handlePagination = (e) => {
    if (e.target.closest('.right')) {
      dispatch(setQuery({
        ...query,
        page: currentPage + 1,
      }));
    }
    if (e.target.closest('.left')) {
      dispatch(setQuery({
        ...query,
        page: currentPage - 1,
      }));
    }
    if (e.target.closest('.pagination-button')) {
      dispatch(setQuery({
        ...query,
        page: Number(e.target.textContent),
      }));
    }
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className="pagination-container"
      onClick={(e) => handlePagination(e)}
    >
      <li className="pagination-item">
        <button className="arrow left" disabled={currentPage === 1} aria-label="Вернуться на предыдущую страницу"></button>
      </li>
      {paginationRange.map((elem, id) => {
        if (elem === DOTS) {
          return <li key={id} className="pagination-item dots">&#8230;</li>;
        }
        return (
          <li key={id} className={`pagination-item ${currentPage === elem ? 'selected' : ''}`}>
            <button className="pagination-button" disabled={currentPage === elem}>{elem}</button>
          </li>
        );
      })}
      <li className="pagination-item">
        <button className="arrow right" disabled={currentPage === lastPage} aria-label="Перейти на следующую страницу"></button>
      </li>
    </ul>
  );
};


Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  siblingCount: PropTypes.number.isRequired,
};


export default Pagination;
