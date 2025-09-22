import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import NotAuthorized from "../pages/NotAuthorize";

const AdminRoute = () => {
  const { isLoggedIn, user, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <NotAuthorized />;
  }

  return <Outlet />;
};

export default AdminRoute;
