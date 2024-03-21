import { useDispatch, useSelector } from "react-redux";
import { useGetUsersQuery } from "../../redux/api/users";
import { setUsers } from "../../redux/features/users/usersSlice";
import { useEffect } from "react";
import GalleryCard from "../GalleryCard/GalleryCard";
import './index.css';
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";

const Gallery = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);
  const { data: fetchedData, isSuccess, isError, isFetching } = useGetUsersQuery(query);

  useEffect(() => {
    dispatch(setUsers(fetchedData?.users || []));
  }, [fetchedData, dispatch]);

  return (
    <section className={`gallery ${isFetching || isError ? 'no-content' : ''}`}>
      {/* <Loader /> */}
      {isFetching && <Loader />}
      {isError && <h2 className="gallery-title title-error">Ничего не найдено</h2>}
      {!isFetching && isSuccess && data.length > 0 && (
        <>
          <h2 className="gallery-title">Найдено выпускников ({fetchedData.total})</h2>
          {data.map((elem) => <GalleryCard key={elem._id} user={elem} />)}
          <Pagination
            totalCount={Number(fetchedData.total)}
            currentPage={Number(query.page)}
            pageSize={20}
            siblingCount={1}
          />
        </>
      )
      }
    </section>
  );
};

export default Gallery;
