import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const CustomersManager = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const sqlQuery = 'SELECT * FROM payments;';

      const { data, error } = await supabase
        .from("payments")
        .select("*");

      if (error) {
        console.error("Error fetching customers data:", error);
      } else {
        setCustomers(data);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const sqlDelete = `DELETE FROM payments WHERE id_payment = ${id};`;
    const { error } = await supabase.rpc('execute_sql', { p_sql: sqlDelete });

    if (error) {
      console.error("Error deleting payment:", error);
    } else {
      setCustomers(customers.filter(customer => customer.id_payment !== id));
    }
  };

  const handleConfirmed = async (id) => {
    const sqlUpdate = `UPDATE payments SET payment_status = 'confirmed' WHERE id_payment = ${id};`;
    const { error } = await supabase.rpc('execute_sql', { p_sql: sqlUpdate });

    if (error) {
      console.error("Error confirming payment:", error);
    } else {
      setCustomers(customers.map(customer => 
        customer.id_payment === id ? { ...customer, payment_status: "confirmed" } : customer
      ));
    }
  };

  const handleCancelled = async (id) => {
    const sqlUpdate = `UPDATE payments SET payment_status = 'cancelled' WHERE id_payment = ${id};`;
    const { error } = await supabase.rpc('execute_sql', { p_sql: sqlUpdate });

    if (error) {
      console.error("Error cancelling payment:", error);
    } else {
      setCustomers(customers.map(customer => 
        customer.id_payment === id ? { ...customer, payment_status: "cancelled" } : customer
      ));
    }
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            {[
              "ID Payment",
              "First Name",
              "Last Name",
              "Email",
              "Contact",
              "Amount",
              "Payment Status",
              "Payment Reference",
              "Created At",
              "Updated At",
              "Actions"
            ].map((header, idx) => (
              <th key={idx} className="p-4 text-left font-semibold text-sm">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="p-4 text-gray-700">{customer.id_payment}</td>
              <td className="p-4 text-gray-700">{customer.firstname}</td>
              <td className="p-4 text-gray-700">{customer.lastname}</td>
              <td className="p-4 text-gray-700">{customer.email}</td>
              <td className="p-4 text-gray-700">{customer.contact}</td>
              <td className="p-4 text-gray-700">{customer.amount}</td>
              <td className="p-4 text-gray-700">{customer.payment_status}</td>
              <td className="p-4 text-gray-700">{customer.payment_reference}</td>
              <td className="p-4 text-gray-700">{customer.created_at}</td>
              <td className="p-4 text-gray-700">{customer.updated_at}</td>
              <td className="p-4 text-gray-700">
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleDelete(customer.id_payment)}
                >
                  Delete
                </button>
                <button 
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleConfirmed(customer.id_payment)}
                >
                  Confirmed
                </button>
                <button 
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleCancelled(customer.id_payment)}
                >
                  Cancelled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersManager;