import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:3000/signup",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.user.id
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <FaGithub
        className="text-white mb-4"
        size={60}
      />

      {/* Heading */}
      <h1 className="text-white text-5xl font-light mb-8">
        Sign Up
      </h1>

      {/* Signup Card */}
      <div className="w-full max-w-md bg-[#161b22] rounded-xl p-8 shadow-lg">

        <form
          onSubmit={handleSignup}
          className="space-y-6"
        >
          {/* Username */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 rounded-md p-3 text-sm">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full border border-indigo-500 text-white py-3 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>
      </div>

      {/* Footer Card */}
      <div className="w-full max-w-md mt-6 border border-gray-700 rounded-xl p-6 text-center">
        <span className="text-gray-300">
          Already have an account?{" "}
        </span>

        <Link
          to="/auth"
          className="text-indigo-400 hover:text-indigo-300"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;