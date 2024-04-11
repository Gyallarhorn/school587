import { useEffect, useState } from "react";
import UniversitiesFilter from "../../../components/UniversitiesFilter/UniversitiesFilter";
import { useFetchUniversitiesQuery } from "../../../redux/api/universities";
import { useSelector, useDispatch } from 'react-redux';
import { setQuery } from "../../../redux/features/users/usersSlice";
import UniversitiesContent from "../../../components/UniversitiesContent/UniversitiesContent";
import { useCountUniversitiesQuery, useDeleteUniversityMutation } from "../../../redux/api/admin";
import Loader from "../../../components/Loader/Loader";
import './index.css';
import UniversityPopup from "../../../components/UniversityPopup/UniversityPopup";
import { createPortal } from "react-dom";
import { toast } from 'react-toastify';

const Universitites = () => {
  const { query } = useSelector((state) => state.users);
  const [filterConfig, setFilterConfig] = useState({
    university: '',
    page: query.page,
  });
  const [isOpen, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, isFetching, isError, isSuccess, refetch } = useFetchUniversitiesQuery(filterConfig);
  const { data: countCheckedUsers, isLoading: isLoadingCounting, isError: isErrorCount, isSuccess: isSuccessCount, refetch: refetchCounting } = useCountUniversitiesQuery();
  const [deleteUniversity, { isLoading }] = useDeleteUniversityMutation();

  const [popupData, setPopupData] = useState({
    name: '',
    _id: '',
    type: 'add',
  });

  useEffect(() => {
    if (+query.page > 1) {
      dispatch(setQuery({
        ...query,
        page: 1,
      }));

      setFilterConfig((prevValue) => ({
        ...prevValue,
        page: 1,
      }));
    }

    return () => {
      dispatch(setQuery({
        name: '',
        letter: '',
        page: 1,
      }));
    };
  }, []);

  useEffect(() => {
    setFilterConfig((prevValue) => ({
      ...prevValue,
      page: query.page,
    }));
  }, [query]);

  const refetchData = () => {
    refetch();
    refetchCounting();
  };

  const handleClickButton = (value) => {
    setFilterConfig((prevValue) => ({
      ...prevValue,
      university: value,
    }));
  };

  const handlePopup = (config) => {
    setOpen(true);
    setPopupData(config);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteUniversity(id);

      if (res.error) {
        throw new Error(res.error.data.message);
      }

      toast.success(res.data.message);
      refetchData();

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section
      className={`universities ${(isFetching || isLoading || isError || isErrorCount) ? 'universities-no-content' : ''}`.trim()}
    >
      <h1 className="main-header">База учебных заведений</h1>
      <UniversitiesFilter
        onClickButton={handleClickButton}
        onHandlePopup={((config) => handlePopup(config))}
      />
      {(isFetching || isLoading || isLoadingCounting) && <Loader universities={true} />}
      {(isError || data?.length === 0 || isErrorCount) && <h2 className=" title-error">Ничего не найдено</h2>}
      {!isFetching && !isLoading && !isLoadingCounting && isSuccess && isSuccessCount && data?.length > 0 && (
        <UniversitiesContent
          data={
            {
              universities: data,
              count: countCheckedUsers,
              page: filterConfig.page,
            }
          }
          isLoading={isLoading}
          onDelete={(id) => handleDelete(id)}
          onHandlePopup={handlePopup}
        />
      )}
      {isOpen && createPortal(
        <UniversityPopup
          onClosePopup={() => setOpen(false)}
          popupData={popupData}
          onRefetch={refetchData}
        />
        , document.querySelector('#root'),
      )}
    </section>

  );
};

export default Universitites;
