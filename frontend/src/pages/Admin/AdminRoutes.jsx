import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoutes = () => {
  const { adminInfo } = useSelector((state) => state.auth);
  return adminInfo && adminInfo.isAdmin
    ? (<Outlet />)
    : (<Navigate to="/" replace />);
};

export default AdminRoutes;
