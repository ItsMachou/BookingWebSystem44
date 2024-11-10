import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AccountSettings = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');

  useEffect(() => {
    // Fetch user data from Supabase using raw SQL
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const sqlSelect = `
          SELECT username, email, contact_no 
          FROM accounts 
          WHERE id_acc = '${user.id}'
        `;
        const { data, error } = await supabase.rpc('execute_sql', {
          p_sql: sqlSelect
        });
        if (data && data.length > 0) {
          setUsername(data[0].username);
          setEmail(data[0].email);
          setContactNo(data[0].contact_no);
        }
        if (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    navigate('/'); // Navigate to the home page
  };

  const handleCancel = () => {
    // Reset the form fields
    setUsername('');
    setEmail('');
    setContactNo('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Construct the SQL update statement
      const sqlUpdate = `
        UPDATE accounts
        SET username = '${username}',
            email = '${email}',
            contact_no = '${contactNo}'
        WHERE id_acc = '${user.id}';
      `;

      // Call the execute_sql stored procedure to run the SQL update
      const { error: updateError } = await supabase.rpc('execute_sql', {
        p_sql: sqlUpdate
      });

      if (updateError) {
        console.error('Error updating user data:', updateError);
      } else {
        console.log('User data updated successfully');
      }
    }
  };

  const handleDelete = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      // Construct the SQL delete statement
      const sqlDelete = `
        DELETE FROM accounts
        WHERE id_acc = '${user.id}';
      `;

      // Call the execute_sql stored procedure to run the SQL delete
      const { error: deleteError } = await supabase.rpc('execute_sql', {
        p_sql: sqlDelete
      });

      if (deleteError) {
        console.error('Error deleting user data:', deleteError);
      } else {
        console.log('User data deleted successfully');
        // Log out the user
        await supabase.auth.signOut();
        // Navigate to the login page or home page
        navigate('/login'); // Adjust the path as needed
      }
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      {/* Set a wider container */}
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md mt-16">
        {/* Back button */}
        <div className="flex items-center mb-4">
          <button onClick={handleBack} className="text-gray-600 text-sm">&larr; Back</button>
        </div>

        {/* Title */}
        <h2 className="text-center text-3xl font-semibold mb-6">MASADYA</h2>

        {/* Section title */}
        <h3 className="text-lg font-bold mb-6">Personal Details</h3>

        {/* Form with adjusted spacing */}
        <form className="space-y-6" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700">Contact No.</label>
            <input
              type="tel"
              className="w-full px-4 py-3 border rounded-md bg-gray-100 focus:outline-none"
              placeholder="Enter your Contact Number"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Account
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;