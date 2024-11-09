import React from "react";

const CustomersManager = () => {
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
          {/* Additional rows would go here */}
          <tr className="hover:bg-gray-100">
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
            <td className="p-4 text-gray-700"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomersManager;