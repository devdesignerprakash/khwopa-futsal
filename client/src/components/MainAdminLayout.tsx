import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import AdminNav from "./AdminNav";
import NotAuthorized from "../pages/NotAuthorize";

const MainAdminLayout = () => {
  const context = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    // Minimum spinner time: 1 second
    const timer = setTimeout(() => setShowSpinner(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Context not loaded yet → show spinner
  if (!context || showSpinner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { isLoggedIn, user } = context;

  // User is fetched but not admin → show not authorized
  if (!isLoggedIn || user?.role !== "admin") {
    return (
      <NotAuthorized/>
    );
  }

  // User is admin → render layout
  return (
    <div className="flex h-screen">
      <AdminNav />
      <main className="flex-1 overflow-y-auto p-6 bg-muted/30">
        <Outlet />
      </main>
    </div>
  );
};

export default MainAdminLayout;
