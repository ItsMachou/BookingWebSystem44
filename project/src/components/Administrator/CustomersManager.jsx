import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const CustomersManager = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const sqlQuery = 'SELECT * FROM accounts WHERE role = "user";';

      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("role", "user");

      if (error) {
        console.error("Error fetching customers data:", error);
      } else {
        console.log("Fetched customers:", data); // Log fetched data
        setCustomers(data);
      }
      console.log("Executing SQL query:", sqlQuery);
    };

    fetchCustomers();
  }, []);

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            {["Customer Name", "Contact", "Email", "Package Name", "Package Type", "Price", "Status"].map(
              (header, idx) => (
                <th key={idx} className="p-4 text-left font-semibold text-sm">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.map((customer, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="p-4 text-gray-700">{customer.name}</td>
              <td className="p-4 text-gray-700">{customer.contact}</td>
              <td className="p-4 text-gray-700">{customer.email}</td>
              <td className="p-4 text-gray-700">{customer.package_name}</td>
              <td className="p-4 text-gray-700">{customer.package_type}</td>
              <td className="p-4 text-gray-700">{customer.price}</td>
              <td className="p-4 text-gray-700">{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomersManager;