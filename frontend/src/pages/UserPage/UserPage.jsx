import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import plugMobile from '../../assets/plug_mobile.webp';
import plugTablet from '../../assets/plug_tablet.webp';
import plugDekstop from '../../assets/plug_dekstop.webp';
import './index.css';
import ContentList from "../../components/ContentList/ContentList";
import { mainContentKeys, additioanlContentKeys } from "../../utils/constants";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import useUserData from "../../hooks/useUserData";

const UserPage = ({ isAdmin }) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useUserData(isAdmin, id);

  if (isError) {
    toast.error('Пользователь не найден');
  }

  return (
    <section className={`user ${isLoading || isError ? 'user-no-content' : ''}`}>
      <Link className="back-button" to="/">Назад</Link>
      {isLoading || isError || !isSuccess && <Loader />}
      {!isLoading && !isError && isSuccess && (
        <>
          <div className="main-content">
            <div className="image-wrapper">
              {data?.photo
                ? (
                  <img className="user-image" src={`${import.meta.env.VITE_BASE_URL}${data.photo}`} alt={`${data.lastName}`} />
                )
                : (
                  <picture className="image-container avatar-container">
                    <source media="(min-width: 1280px)" srcSet={plugDekstop} />
                    <source media="(min-width: 768px)" srcSet={plugTablet} />
                    <img className="user-image" src={plugMobile} alt={`${data.lastName}`} />
                  </picture>
                )}
            </div>
            <h1 className="user-title">{data.fullName}</h1>
            <dl className="main-content-list">
              {mainContentKeys.map((key, index) => {
                if (data[key]) {
                  return <ContentList key={index} objectKey={key} value={data[key]} />;
                }
              })}
            </dl>
          </div>
          <dl className="additional-content-list">
            {additioanlContentKeys.map((key, index) => {
              if (data[key]) {
                return <ContentList key={index} objectKey={key} value={data[key]} bottom={true} />;
              }
            })}
          </dl>
        </>
      )}
    </section>
  );
};


UserPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};



export default UserPage;
