import React, { useState } from "react";

const EmployeesAccount = () => {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", username: "johndoe" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", username: "janesmith" },
  ]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleSaveEmployee = () => {
    if (!selectedEmployee.firstName || !selectedEmployee.lastName || !selectedEmployee.email || !selectedEmployee.username) {
      alert("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(selectedEmployee.email)) {
      alert("Please enter a valid email address");
      return;
    }

    const emailExists = employees.some(
      (emp) => emp.email === selectedEmployee.email && emp.id !== selectedEmployee.id
    );
    if (emailExists) {
      alert("Email already exists");
      return;
    }

    if (isEditing) {
      // Update employee
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === selectedEmployee.id ? selectedEmployee : emp
        )
      );
      alert("Employee has been updated");
    } else {
      // Add new employee
      const newEmployee = {
        id: employees.length + 1,
        ...selectedEmployee,
      };
      setEmployees([...employees, newEmployee]);
      alert("Employee has been added");
    }
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const handleDeleteEmployee = () => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((emp) => emp.id !== selectedEmployee.id)
    );
    setSelectedEmployee(null);
    setIsEditing(false);
    alert("Employee has been deleted");
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Employee’s Account</h2>
      <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">First Name</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter first name"
                value={selectedEmployee ? selectedEmployee.firstName : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, firstName: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Last Name</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter last name"
                value={selectedEmployee ? selectedEmployee.lastName : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Email</label>
              <input
                type="email"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter email"
                value={selectedEmployee ? selectedEmployee.email : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Username</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter username"
                value={selectedEmployee ? selectedEmployee.username : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                onClick={handleSaveEmployee}
              >
                {isEditing ? "Update Employee" : "Create Employee"}
              </button>
              {isEditing && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                  onClick={handleDeleteEmployee}
                >
                  Delete Employee
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                {["First Name", "Last Name", "Email", "Username"].map((header, idx) => (
                  <th key={idx} className="p-4 text-left font-semibold text-sm">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectEmployee(employee)}
                >
                  <td className="p-4 text-gray-700">{employee.firstName}</td>
                  <td className="p-4 text-gray-700">{employee.lastName}</td>
                  <td className="p-4 text-gray-700">{employee.email}</td>
                  <td className="p-4 text-gray-700">{employee.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesAccount;