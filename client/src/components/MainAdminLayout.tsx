import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import AdminNav from "./AdminNav";
import NotAuthorized from "../pages/NotAuthorize";

const MainAdminLayout = () => {
  const { isLoggedIn, user, loading } = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(true);

  // Minimum spinner display time: 1 second
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowSpinner(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Show spinner while loading or during minimum delay
  if (loading || showSpinner) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // User fetched but not admin → show not authorized
  if (!isLoggedIn || user?.role !== "admin") {
    return <NotAuthorized />;
  }

  // User is admin → render layout
  console.log("user from adminlayout", user);
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
