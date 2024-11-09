import React, { useState, useEffect } from "react";
import EmployeesAccount from "../components/Administrator/EmployeesAccount";
import PackageCreator from "../components/Administrator/PackageCreator";
import CustomersManager from "../components/administrator/CustomersManager";
import "../components/Notification/Notification.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("packageCreator");
  const [packages, setPackages] = useState([
    { id: 1, name: "Package 1", type: "Type 1", price: "100", description: "Description 1" },
    { id: 2, name: "Package 2", type: "Type 2", price: "200", description: "Description 2" },
  ]);
  const [notifications, setNotifications] = useState([]);

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
        <PackageCreator
          packages={packages}
          setPackages={setPackages}
          addNotification={addNotification}
        />
      );
    } else if (activeSection === "employees") {
      return <EmployeesAccount />;
    } else if (activeSection === "customers") {
      return <CustomersManager />;
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