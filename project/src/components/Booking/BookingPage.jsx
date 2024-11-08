import React from "react";
import { Link } from "react-router-dom";

function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 pt-20">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <Link to="/" className="text-gray-600 text-sm mb-4">
          &larr; Back
        </Link>
        <h1 className="text-center text-2xl font-bold mb-8">MASADYA</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Packages Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Packages</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {/* Placeholder Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-4 18V11m-5.5 8.5l1.5-1.5m6 0l-1.5-1.5m-6 1.5h12M12 11V7"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Packages</h3>
                      <p className="text-sm text-gray-500">Pick your package</p>
                    </div>
                  </div>
                  <input type="radio" name="package" />
                </div>
              ))}
            </div>
          </div>

          {/* Total Section */}
          <div className="bg-gray-50 rounded-lg p-6 border">
            <h2 className="text-xl font-bold mb-4">TOTAL</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700">Delivery Fee</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700">Delivery Discount</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700">Taxes & Other Fees</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Options */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Booking Options</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <span>Add a payment method</span>
              </div>
            </div>

            <div className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-4 18V11m-5.5 8.5l1.5-1.5m6 0l-1.5-1.5m-6 1.5h12M12 11V7"
                  />
                </svg>
                <span>Choose a date</span>
              </div>
            </div>

            <div className="border rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c3.866 0 7 3.134 7 7H5c0-3.866 3.134-7 7-7z"
                  />
                </svg>
                <span>Choose a time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;