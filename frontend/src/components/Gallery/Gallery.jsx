import { useDispatch, useSelector } from "react-redux";
import { useFetchUsersQuery } from "../../redux/api/users";
import { setUsers } from "../../redux/features/users/usersSlice";
import { useEffect } from "react";
import GalleryCard from "../GalleryCard/GalleryCard";
import './index.css';
import Loader from "../Loader/Loader";

const Gallery = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);
  const { data: fetchedData, isLoading, isSuccess, isError } = useFetchUsersQuery(query);

  console.log(isLoading);

  useEffect(() => {
    dispatch(setUsers(fetchedData?.users || []));
  }, [fetchedData, dispatch]);

  return (
    <section className="gallery">
      {data.length === 0 && <Loader />}
      {isError && <h2 className="gallery-title title-error">Ничего не найдено</h2>}
      {isSuccess && data.length > 0 && (
        <>
          <h2 className="gallery-title">Найдено выпускников ({fetchedData.total})</h2>
          {data.map((elem) => <GalleryCard key={elem._id} user={elem} />)}
        </>
      )
      }
    </section>
  );
};

export default Gallery;
