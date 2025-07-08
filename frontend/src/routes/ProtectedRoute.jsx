import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

const ProtectedRoute = ({ role }) => {
  const { authUser } = useAuthStore();

  if (!authUser) return <Navigate to="/login" replace />;

  if (role && authUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
