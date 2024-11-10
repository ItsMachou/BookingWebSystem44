import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 


const OrderPopup = ({ orderPopup, setOrderPopup }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const navigate = useNavigate();

  const handleTransactionSubmit = (transactionData) => {
    console.log("Transaction Data:", transactionData);
  };

  return (
    <>
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[300px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-black/70">
                Book Your Trip
              </h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setOrderPopup(false)}
              />
            </div>
            {/* Body */}
            {isFormVisible ? (
              <TransactionForm onSubmit={handleTransactionSubmit} />
            ) : (
              <div className="mt-4">
                <p className="text-center mb-4">
                  Do you want to book your trip?
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("/booking")} 
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPopup;
