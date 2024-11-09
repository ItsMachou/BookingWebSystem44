import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import backgroundImage from "../../assets/new york.jpeg";
import Modal from "./Modal"; // Import the Modal component

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState(""); // Add contact number state
  const [role] = useState("user"); // Set role to "user" by default
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Handle sign-up logic
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          firstname,
          lastname,
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
        '${lastname}', 
        '${firstname}', 
        '${username}', 
        '${email}', 
        '${contactNo}', 
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
      setShowModal(true); // Show the modal
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {notification && <div className="text-green-500 mb-4">{notification}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
      <Modal
        show={showModal}
        message="Verify your email to be able to login."
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RegisterForm;