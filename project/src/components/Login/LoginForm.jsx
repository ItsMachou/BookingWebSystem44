import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import backgroundImage from "../../assets/new york.jpeg";

const LoginForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // New state for role
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setError(null);

    if (isSignUp) {
      // Handle sign-up logic
      console.log("Signed up successfully:", { username, firstname, lastname, email, password, role });
    } else {
      // Handle login logic
      console.log("Logged in successfully:", { email, password });
      login({ username });
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative p-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      <div className="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl p-6 bg-white bg-opacity-90 rounded shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          {isSignUp ? "SIGN UP" : "LOGIN"}
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block mb-1" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="firstname">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-gray-200 focus:outline-none"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-600 text-white rounded"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 w-full text-center text-blue-600 underline"
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>

      <h1 className="absolute top-20 right-10 text-4xl md:text-6xl lg:text-7xl font-bold text-white">
        NEW YORK
      </h1>
    </div>
  );
};

export default LoginForm;