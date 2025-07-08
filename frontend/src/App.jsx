import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";
const App = () => {
  const location = useLocation();

  const renderNavbar = () => {
    if (
      location.pathname === "/seller-dashboard" ||
      location.pathname === "/admin" ||
      location.pathname === "/admin/users" ||
      location.pathname === "/admin/products" ||
      location.pathname === "/admin/sellers"
    )
      return;
    else return <Navbar />;
  };
  return (
    <div>
      <ScrollToTop />
      {renderNavbar()}
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
