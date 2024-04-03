import { useCountCheckedUsersQuery, useCountNewUsersQuery, useDeleteUserMutation, useGetAllCheckedUsersQuery } from "../../redux/api/admin";
import Loader from "../Loader/Loader";
import AdminNavigation from "../AdminNavigation/AdminNavigation";
import AdminContent from "../AdminContent/AdminContent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUsers } from "../../redux/features/users/usersSlice";
import Pagination from "../Pagination/Pagination";
import './index.css';
import { toast } from "react-toastify";
import { useLocation } from "react-router";

const AdminChecked = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.users);
  const { data } = useSelector((state) => state.users);
  const location = useLocation();
  const source = new URLSearchParams(location.search).get('source');

  const { data: countNewUsers, isLoading: isLoadingCountingNewUsers, isSuccess: isSuccessCountNewUsers, refetch: refetchCountingNewUsers } = useCountNewUsersQuery();
  const { data: countCheckedUsers, isLoading: isLoadingCountingCheckedUsers, isSuccess: isSuccessCountCheckedUsers, refetch: refetchCountCheckedUsersQuery } = useCountCheckedUsersQuery();
  const { data: allCheckedUsers, isFetching: isFetchingCheckedUsers, isSuccess: isSuccessCheckedUsers, refetch: refetchAllCheckedUsersQuery, isError } = useGetAllCheckedUsersQuery(query);

  const [deleteUser, { isLoading: isLoadingDeleting }] = useDeleteUserMutation();

  useEffect(() => {
    if (source) {
      refetchAllCheckedUsersQuery();
      refetchCountCheckedUsersQuery();
      refetchCountingNewUsers();
    }
  }, [source]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id);

      if (res.data && res.data.message) {
        toast.success(`Выпускник успешно удален из базы`);
        refetchAllCheckedUsersQuery();
        refetchCountCheckedUsersQuery();
      } else {
        throw new Error(res.error.data.message);
      }

    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    dispatch(setUsers(allCheckedUsers?.users || []));
  }, [allCheckedUsers, dispatch]);

  return (
    <section className={`admin-panel ${isLoadingCountingNewUsers || isLoadingCountingCheckedUsers || isFetchingCheckedUsers || isError ? 'no-content' : ''}`}>
      {(isLoadingCountingNewUsers || isLoadingCountingCheckedUsers || isFetchingCheckedUsers) && <Loader />}
      {isError && <h2 className="gallery-title title-error">Ничего не найдено</h2>}
      {isSuccessCountCheckedUsers
        && isSuccessCountNewUsers
        && !isFetchingCheckedUsers
        && isSuccessCheckedUsers
        && data.length > 0 && (
          <>
            <h2 className="visually-hidden">Найденные пользователи</h2>
            <AdminNavigation
              countNew={countNewUsers}
              countAll={countCheckedUsers}
            />
            <AdminContent
              data={data}
              onDelete={handleDelete}
              isLoading={isLoadingDeleting}
            />
            <Pagination
              totalCount={Number(allCheckedUsers.total)}
              currentPage={Number(query.page)}
              pageSize={20}
              siblingCount={1}
            />
          </>
        )}
    </section>
  );
};

export default AdminChecked;
