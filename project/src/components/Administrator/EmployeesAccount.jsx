import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const EmployeesAccount = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(""); // State to store the UUID
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null);

  // Function to generate email based on first name and last name
  const generateEmail = (firstName, lastName) => {
    return `${lastName.slice(0, 2).toLowerCase()}${firstName.toLowerCase()}@gmail.com`;
  };

  // Function to generate username based on first name and last name
  const generateUsername = (firstName, lastName) => {
    return `${lastName.slice(0, 2).toLowerCase()}${firstName.toLowerCase()}`;
  };

  // Fetch employees from the accounts table using Supabase query builder
  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from('accounts')
      .select('id_acc, firstname, lastname, email, username')
      .eq('role', 'employee');

    console.log('Executing SQL query: SELECT id_acc, firstname, lastname, email, username FROM public.accounts WHERE role = employee;');
    if (error) {
      console.error('Error fetching employees:', error);
      setError("Failed to fetch employees. Please try again.");
    } else {
      console.log('Fetched employees:', data);
      setEmployees(data);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSelectEmployee = (employee) => {
    console.log("Selected employee:", employee);
    setSelectedEmployee(employee);
    setSelectedEmployeeId(employee.id_acc); // Set the UUID state variable
    setIsEditing(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const firstName = selectedEmployee.firstname;
    const lastName = selectedEmployee.lastname;
    const email = generateEmail(firstName, lastName);
    const username = generateUsername(firstName, lastName);
    const role = 'employee';
    const contactNo = null; // Contact number can be null

    // Handle sign-up logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password: 'defaultpassword', // Use a default password or generate one
      options: {
        data: {
          username,
          firstname: firstName,
          lastname: lastName,
          role,
        },
      },
    });

    if (error) {
      setError(error.message);
      return; // Exit the function if there is an error
    }

    // Check if user is defined
    if (!data.user) {
      setError("User registration failed.");
      return; // Exit the function if user is undefined
    }

    console.log("Signed up successfully:", data.user);

    // Hard-coded SQL insert statement with user ID
    const sqlInsert = `
      INSERT INTO accounts (id_acc, lastname, firstname, username, email, contact_no, role)
      VALUES (
        '${data.user.id}',  -- Use the authenticated user's ID
        '${lastName}', 
        '${firstName}', 
        '${username}', 
        '${email}', 
        ${contactNo}, 
        '${role}'
      );
    `;

    // Call the execute_sql stored procedure to run the hard-coded SQL insert
    const { error: insertError } = await supabase.rpc('execute_sql', {
      p_sql: sqlInsert
    });

    if (insertError) {
      console.error("Error inserting into accounts table:", insertError);
      setError(insertError.message || "An error occurred while inserting data.");
    } else {
      console.log("Inserted into accounts table successfully");
      setNotification("Account has been added successfully!");
      setShowModal(true); // Show the modal
      fetchEmployees(); // Refresh the employee list
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    const { id_acc, firstname, lastname, username } = selectedEmployee;

    // Parameterized SQL update statement
    const sqlUpdate = `
      UPDATE accounts
      SET firstname = $1, lastname = $2, username = $3
      WHERE id_acc = $4;
    `;

    const params = [firstname, lastname, username, id_acc];

    // Call the execute_sql stored procedure to run the parameterized SQL update
    const { error: updateError } = await supabase.rpc('execute_sql', {
      p_sql: sqlUpdate,
      p_params: params
    });

    if (updateError) {
      console.error("Error updating employee:", updateError);
      setError("An error occurred while updating data. Please try again.");
    } else {
      console.log("Updated employee successfully");
      setNotification("Employee has been updated successfully!");
      setShowModal(true); // Show the modal
      fetchEmployees(); // Refresh the employee list
      setIsEditing(false);
    }
  };

  const handleDeleteAccount = async (id_acc) => {
    console.log("Deleting account with id:", id_acc);
  
    // First, fetch the user associated with the account to delete from Auth
    const { data: userData, error: userError } = await supabase
      .from('accounts')
      .select('id_acc') // Assuming you want to delete by user ID
      .eq('id_acc', id_acc)
      .single();
  
    if (userError) {
      console.error("Error fetching user data:", userError);
      setError("Failed to fetch user data. Please try again.");
      return;
    }
  
    // Delete the user from Supabase Auth using the user ID
    const { error: authDeleteError } = await supabase.auth.admin.deleteUser(userData.id_acc);
  
    if (authDeleteError) {
      console.error("Error deleting user from Auth:", authDeleteError);
      setError("Failed to delete user from Auth. Please try again.");
      return;
    }
  
    // Parameterized SQL delete statement for the accounts table
    const sqlDelete = `
      DELETE FROM accounts
      WHERE id_acc = $1::uuid;
    `;
  
    // Call the execute_sql stored procedure to run the parameterized SQL delete
    const { error: deleteError } = await supabase.rpc('execute_sql', {
      p_sql: sqlDelete,
      p_params: [id_acc] // Pass the UUID as a parameter
    });
  
    if (deleteError) {
      console.error("Error deleting account from database:", deleteError);
      setError("An error occurred while deleting the account from the database. Please try again.");
    } else {
      console.log("Deleted account successfully from database");
      setNotification("Account has been deleted successfully!");
      setShowModal(true); // Show the modal
      fetchEmployees(); // Refresh the account list
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Employee’s Account</h2>
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{notification}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setNotification(null)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/>
            </svg>
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M14.348 5.652a1 1 0 00-1.414 0L10 8.586 7.066 5.652a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 11.414l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934a1 1 0 000-1.414z"/>
            </svg>
          </span>
        </div>
      )}
      <div className="flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <div className="space-y-6">
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">UUID</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedEmployeeId}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">First Name</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter first name"
                value={selectedEmployee ? selectedEmployee.firstname : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, firstname: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="text-gray-600 font-medium">Last Name</label>
              <input
                type="text"
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter last name"
                value={selectedEmployee ? selectedEmployee.lastname : ""}
                onChange={(e) =>
                  setSelectedEmployee((prev) => ({ ...prev, lastname: e.target.value }))
                }
              />
            </div>
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                    onClick={handleUpdate}
                  >
                    Update Employee
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                    onClick={() => handleDeleteAccount(selectedEmployee.id_acc)}
                  >
                    Delete Employee
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out"
                  onClick={handleRegister}
                >
                  Register Employee
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-gray-50 rounded-lg shadow-md border border-gray-300 overflow-hidden mt-8">
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
            {employees && employees.map((employee) => (
              <tr
                key={employee.id_acc}
                className="bg-white border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectEmployee(employee)}
              >
                <td className="p-4 text-gray-700">{employee.firstname}</td>
                <td className="p-4 text-gray-700">{employee.lastname}</td>
                <td className="p-4 text-gray-700">{employee.email}</td>
                <td className="p-4 text-gray-700">{employee.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesAccount;