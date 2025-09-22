import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UserContext from "../context/UserContext";

const GuestRoute = () => {
  const { isLoggedIn } = useContext(UserContext);
  const location = useLocation();

  if (isLoggedIn) {
    // Already logged in → go home (or back where they came from)
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
