import React, { useState } from "react";
import Places from "../components/Places/Places";
import OrderPopup from "../components/OrderPopup/OrderPopup";

const PlacesRoute = () => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <>
      <div className="pt-14">
        <Places handleOrderPopup={handleOrderPopup} />
      </div>
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  );
};

export default PlacesRoute;
