import React, { useState, useEffect } from "react";
import "../components/Notification/Notification.css";

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

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("packageCreator");
  const [packages, setPackages] = useState([
    { id: 1, name: "Package 1", type: "Type 1", price: "100", description: "Description 1" },
    { id: 2, name: "Package 2", type: "Type 2", price: "200", description: "Description 2" },
  ]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setIsEditing(true);
  };

  const handleSavePackage = () => {
    if (!selectedPackage.name || !selectedPackage.type || !selectedPackage.price || !selectedPackage.description) {
      addNotification("All fields are required", "error");
      return;
    }

    if (isNaN(selectedPackage.price)) {
      addNotification("Price must be a number", "error");
      return;
    }

    if (isEditing) {
      // Update package
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === selectedPackage.id ? selectedPackage : pkg
        )
      );
      addNotification("Package has been updated", "success");
    } else {
      // Add new package
      const newPackage = {
        id: packages.length + 1,
        ...selectedPackage,
      };
      setPackages([...packages, newPackage]);
      addNotification("Package has been added", "success");
    }
    setSelectedPackage(null);
    setIsEditing(false);
  };

  const handleDeletePackage = () => {
    setPackages((prevPackages) =>
      prevPackages.filter((pkg) => pkg.id !== selectedPackage.id)
    );
    setSelectedPackage(null);
    setIsEditing(false);
    addNotification("Package has been deleted", "success");
  };

  const addNotification = (message, type) => {
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { message, type, id: Date.now() },
    ]);
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prevNotifications) => prevNotifications.slice(1));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const renderSection = () => {
    if (activeSection === "packageCreator") {
      return (
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Package Creator</h2>
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Package Name</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter package name"
                value={selectedPackage ? selectedPackage.name : ""}
                onChange={(e) =>
                  setSelectedPackage((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Package Type</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter package type"
                value={selectedPackage ? selectedPackage.type : ""}
                onChange={(e) =>
                  setSelectedPackage((prev) => ({ ...prev, type: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Price</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter price"
                value={selectedPackage ? selectedPackage.price : ""}
                onChange={(e) =>
                  setSelectedPackage((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Package Description</label>
              <textarea
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter package description"
                rows="4"
                value={selectedPackage ? selectedPackage.description : ""}
                onChange={(e) =>
                  setSelectedPackage((prev) => ({ ...prev, description: e.target.value }))
                }
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                onClick={handleSavePackage}
              >
                {isEditing ? "Update Package" : "Create Package"}
              </button>
              {isEditing && (
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                  onClick={handleDeletePackage}
                >
                  Delete Package
                </button>
              )}
            </div>
          </div>
          <div className="w-full bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden mt-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  {["Package Name", "Package Type", "Price", "Description"].map(
                    (header, idx) => (
                      <th key={idx} className="p-4 text-left font-semibold text-sm">
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {packages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    className="bg-white border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    <td className="p-4 text-gray-700">{pkg.name}</td>
                    <td className="p-4 text-gray-700">{pkg.type}</td>
                    <td className="p-4 text-gray-700">₱{pkg.price}</td>
                    <td className="p-4 text-gray-700">{pkg.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (activeSection === "customers") {
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
    } else if (activeSection === "employees") {
      return <EmployeesAccount />;
    }
  };

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-gray-800 text-white p-4 sticky top-0">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <ul>
          <li
            className={`cursor-pointer p-2 ${activeSection === "packageCreator" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveSection("packageCreator")}
          >
            Package Creator
          </li>
          <li
            className={`cursor-pointer p-2 ${activeSection === "employees" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveSection("employees")}
          >
            Employee Creation
          </li>
          <li
            className={`cursor-pointer p-2 ${activeSection === "customers" ? "bg-gray-700" : ""}`}
            onClick={() => setActiveSection("customers")}
          >
            Customers
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`notification ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white ${index === 0 ? "animate-slide-in" : ""} ${index === notifications.length - 1 ? "animate-fade-out" : ""}`}
            style={{ top: `${index * 80 + 16}px` }}
          >
            {notification.message}
            <div className="loading-bar"></div>
          </div>
        ))}
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminPage;