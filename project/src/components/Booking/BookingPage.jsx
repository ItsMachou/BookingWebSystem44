import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { supabase } from "../../utils/supabaseClient";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://fxnbmnduxydjsfkzsqtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bmJtbmR1eHlkanNma3pzcXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMjgzMTksImV4cCI6MjA0NjcwNDMxOX0.uPFnntpdKnJXo-nO6KSFtm94A7TTC8HRmkivjvZCqg8'

function BookingPage() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const packagePrices = {
    1: 500000, // Budget Package
    2: 1000000, // Standard Package
    3: 2000000, // Deluxe Package
  };

  const handlePackageChange = (e) => {
    const packageId = e.target.value;
    setSelectedPackage(packageId);
    setTotalAmount(packagePrices[packageId]);
  };

  const createPayLink = (amount, description) => {
    const options = {
      method: 'POST',
      url: 'https://api.paymongo.com/v1/links',
      headers: {
        accept: 'application/json',
        authorization: 'Basic c2tfdGVzdF9mMjNUS0M4VjJLS1J5N3FWaUZLN3pmazY6',
        'content-type': 'application/json'
      },
      data: {
        data: {
          attributes: {
            amount: amount,
            description: description
          }
        }
      }
    };

    return axios.request(options)
      .then(res => {
        const checkoutUrl = res.data.data.attributes.checkout_url;
        console.log('Checkout URL:', checkoutUrl);
        return checkoutUrl;
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  };

  const saveBillingInfo = async (referenceNo) => {
  const sqlInsert = `
    INSERT INTO payments (firstname, lastname, email, contact, id_type, amount, payment_status, payment_reference)
    VALUES ('${firstName}', '${lastName}', '${email}', '${contact}', '${selectedPackage}', ${totalAmount / 100}, 'pending', '${referenceNo}')
    RETURNING *;
  `;

  const { data, error } = await supabase.rpc('execute_sql', {
    p_sql: sqlInsert
  });

  if (error) {
    console.error('Error saving billing info:', error);
  } else {
    console.log('Billing info saved:', data);
  }
  };
  
  const handlePayment = () => {
    const description = `Payment for package ${selectedPackage}`;
    const referenceNo = `REF-${Date.now()}`;
    saveBillingInfo(referenceNo);
    createPayLink(totalAmount, description)
      .then(checkoutUrl => {
        window.open(checkoutUrl, '_blank');
        // Redirect to the homepage after a short delay
        setTimeout(() => {
          window.location.href = '/';
        }, 10000); // Adjust the delay as needed
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 flex flex-col space-y-4">
        {/* Back Button and Title */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-gray-600 text-sm">
            &larr; Back
          </Link>
          <h1 className="text-center text-2xl font-bold">MASADYA</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section: Packages and Form Fields */}
          <div className="md:col-span-2 space-y-6">
            {/* Packages Section */}
            <div>
              <h2 className="text-xl font-bold">Packages</h2>
              <div className="mt-2 border rounded-lg p-4 flex items-center space-x-4 bg-gray-50">
                <svg
                  className="w-8 h-8 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <select
                  className="w-full bg-white border-none cursor-pointer text-gray-700"
                  value={selectedPackage}
                  onChange={handlePackageChange}
                >
                  <option value="" disabled>
                    Pick your package
                  </option>
                  <option value="1">Budget Package</option>
                  <option value="2">Standard Package</option>
                  <option value="3">Deluxe Package</option>
                </select>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-2 bg-gray-50"
                />
              </div>
              <div>
                <label className="block font-semibold">Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2 bg-gray-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 bg-gray-50"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-semibold">Last Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2 bg-gray-50"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold">Contact No.</label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 bg-gray-50"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Option Section */}
            <div className="mt-4">
              <h2 className="text-xl font-bold">Payment Option</h2>
              <button
                className="mt-2 w-1/2 border rounded-lg p-4 flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                onClick={handlePayment}
              >
                <svg
                  className="w-8 h-8 text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <span>Pay</span>
              </button>
            </div>
          </div>

          {/* Right Section: Total */}
          <div className="bg-gray-50 rounded-lg p-6 border space-y-2">
            <h2 className="text-xl font-bold">TOTAL</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700 text-sm">Subtotal</p>
                <p className="text-gray-900 font-semibold">₱ {(totalAmount / 100).toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700 text-sm">Delivery Fee</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700 text-sm">Delivery Discount</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 py-2">
                <p className="text-gray-700 text-sm">Taxes & Other Fees</p>
                <p className="text-gray-900 font-semibold">₱ 0.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;