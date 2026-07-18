import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:3000/login",
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
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center px-4">

      {/* GitHub Logo */}
      <FaGithub
        className="text-white mb-4"
        size={60}
      />

      {/* Heading */}
      <h1 className="text-white text-4xl font-light mb-8">
        Sign in to GitHub
      </h1>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-[#161b22] border border-gray-700 rounded-lg p-6">

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block text-sm text-white mb-2">
              Email address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-white">
                Password
              </label>

              <span className="text-xs text-blue-400 cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#0d1117] border border-gray-600 rounded-md px-3 py-2 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 text-sm p-3 rounded">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-medium transition"
          >
            {loading
              ? "Signing in..."
              : "Sign in"}
          </button>

        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-sm border border-gray-700 rounded-lg mt-5 p-4 text-center">

        <span className="text-gray-300">
          New to GitHub?{" "}
        </span>

        <Link
          to="/signup"
          className="text-blue-400 hover:underline"
        >
          Create an account
        </Link>

      </div>
    </div>
  );
};

export default Login;