import { Navigate, Outlet } from "react-router-dom";
import { useAppStore } from "../store/app.store";

const ProtectedRoute = () => {
  const { user } = useAppStore();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
