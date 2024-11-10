import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const PackageCreator = ({ addNotification }) => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({ name: '', type: '', price: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch packages from the database
    const fetchPackages = async () => {
      const { data, error } = await supabase
        .from("package")
        .select("*")
        .order("pkg_name", { ascending: true });
      if (error) {
        addNotification("Failed to fetch packages", "error");
      } else {
        console.log("Fetched packages:", data); // Debug log
        setPackages(data);
      }
    };
    fetchPackages();
  }, [addNotification]);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage({
      pkg_id: pkg.pkg_id,
      name: pkg.pkg_name,
      type: pkg.pkg_type,
      price: pkg.pkg_price,
      description: pkg.pkg_desc
    });
    setIsEditing(true);
  };

  const handleSavePackage = async () => {
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
      const { error } = await supabase
        .from('package')
        .update({
          pkg_name: selectedPackage.name,
          pkg_type: selectedPackage.type,
          pkg_desc: selectedPackage.description,
          pkg_price: parseFloat(selectedPackage.price)
        })
        .eq('pkg_id', selectedPackage.pkg_id);
      if (error) {
        addNotification("Error updating package: " + error.message, "error");
      } else {
        setPackages((prevPackages) =>
          prevPackages.map((pkg) =>
            pkg.pkg_id === selectedPackage.pkg_id ? { ...pkg, ...selectedPackage } : pkg
          )
        );
        addNotification("Package has been updated", "success");
      }
    } else {
      // Add new package
      const { data, error } = await supabase
        .from('package')
        .insert([{
          pkg_name: selectedPackage.name,
          pkg_type: selectedPackage.type,
          pkg_desc: selectedPackage.description,
          pkg_price: parseFloat(selectedPackage.price)
        }]);
      if (error) {
        addNotification("Error adding package: " + error.message, "error");
      } else {
        console.log("New package added:", data); // Debug log
        if (data && Array.isArray(data) && data.length > 0) {
          setPackages((prevPackages) => [...prevPackages, { ...selectedPackage, pkg_id: data[0].pkg_id }]);
          addNotification("Package has been added", "success");
        } else {
          console.error("Unexpected response format from Supabase:", data); // Debug log
          addNotification("Unexpected response format from Supabase", "error");
        }
      }
    }
    setSelectedPackage({ name: '', type: '', price: '', description: '' });
    setIsEditing(false);
  };

  const handleDeletePackage = async () => {
    const { error } = await supabase
      .from('package')
      .delete()
      .eq('pkg_id', selectedPackage.pkg_id);
    if (error) {
      addNotification("Error deleting package: " + error.message, "error");
    } else {
      setPackages((prevPackages) =>
        prevPackages.filter((pkg) => pkg.pkg_id !== selectedPackage.pkg_id)
      );
      setSelectedPackage({ name: '', type: '', price: '', description: '' });
      setIsEditing(false);
      addNotification("Package has been deleted", "success");
    }
  };

  const handleClearSelection = () => {
    setSelectedPackage({ name: '', type: '', price: '', description: '' });
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
            value={selectedPackage.name}
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
            value={selectedPackage.type}
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
            value={selectedPackage.price}
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
            value={selectedPackage.description}
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
                key={pkg.pkg_id}
                className="bg-white border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectPackage(pkg)}
              >
                <td className="p-4 text-gray-700">{pkg.pkg_name}</td>
                <td className="p-4 text-gray-700">{pkg.pkg_type}</td>
                <td className="p-4 text-gray-700">₱{pkg.pkg_price}</td>
                <td className="p-4 text-gray-700">{pkg.pkg_desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageCreator;