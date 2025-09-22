import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";



const MainLayout = () => {
  const location = useLocation();
  
  const hideFooterOn = ["/login", "/signup", "/forgot-password"];
  const shouldHideFooter = hideFooterOn.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 pt-4 px-4 md:px-8">
        <Outlet />
      </main>

      {!shouldHideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
