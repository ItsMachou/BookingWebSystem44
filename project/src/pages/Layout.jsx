import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import OrderPopup from "../components/OrderPopup/OrderPopup";

const Layout = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Outlet />
      {!isAdminPage && <Footer />}
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  );
};

export default Layout;