import React from "react";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    navigate("/auth");
  };

  return (
    <nav className="bg-[#161b22] border-b border-gray-700 px-8 py-4">
      <div className="flex items-center justify-between">

        {/* Left Section */}
        <div className="flex items-center gap-6">
          <FaGithub
            size={35}
            className="text-white cursor-pointer"
          />

          <input
            type="text"
            placeholder="Search repositories..."
            className="bg-[#0d1117] text-white border border-gray-700 rounded-md px-3 py-2 w-72 outline-none focus:border-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-white">

          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            className="hover:text-blue-400 transition"
          >
            Profile
          </Link>

          <Link
            to="/create"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition"
          >
            + New Repo
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;