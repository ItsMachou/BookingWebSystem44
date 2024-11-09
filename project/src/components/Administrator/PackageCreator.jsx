import React, { useState } from "react";

const PackageCreator = ({ packages, setPackages, addNotification }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleClearSelection = () => {
    setSelectedPackage(null);
    setIsEditing(false);
  };

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
          {selectedPackage && (
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
              onClick={handleClearSelection}
            >
              Clear Selection
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
};

export default PackageCreator;