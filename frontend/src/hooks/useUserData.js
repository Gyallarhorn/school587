import { useGetSpecificUserByAdminQuery } from "../redux/api/admin";
import { useGetSpecificUserQuery } from "../redux/api/users";

const useUserData = (isAdmin, id) => {
  const query = isAdmin ? useGetSpecificUserByAdminQuery : useGetSpecificUserQuery;
  const { data, isLoading, isError, isSuccess, refetch } = query(id);

  return { data, isLoading, isError, isSuccess, refetch };
};

export default useUserData;
