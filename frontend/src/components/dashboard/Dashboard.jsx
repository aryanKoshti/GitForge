import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/repo/user/${userId}`
      );

      console.log(response.data);
      setRepositories(
        response.data.repositories || []
      );
    } catch (err) {
      console.error(
        "Error fetching repositories:",
        err
      );

      throw err;
    }
  };

  const fetchSuggestedRepositories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/repo/all"
      );

      setSuggestedRepositories(
        response.data || []
      );
    } catch (err) {
      console.error(
        "Error fetching suggested repositories:",
        err
      );

      throw err;
    }
  };

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        await Promise.all([
          
          fetchRepositories(),
          fetchSuggestedRepositories(),
        ]);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadDashboard();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const filteredRepositories =
    repositories.filter((repo) =>
      repo.repoName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0d1117] text-white flex justify-center items-center">
          Loading Dashboard...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0d1117] text-red-500 flex justify-center items-center">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0d1117] text-white px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Suggested Repositories */}
          <div className="bg-[#161b22] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
              Suggested Repositories
            </h2>

            <div className="space-y-4">
              {suggestedRepositories.length > 0 ? (
                suggestedRepositories.map((repo) => (
                  <div
                    key={repo._id}
                    className="border-b border-gray-700 pb-3"
                  >
                    <h3 className="text-blue-400 font-semibold">
                      {repo.repoName}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {repo.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No repositories found
                </p>
              )}
            </div>
          </div>

          {/* User Repositories */}
          <div className="bg-[#161b22] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Your Repositories
            </h2>

            <input
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="w-full mb-6 bg-[#0d1117] border border-gray-700 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />

            <div className="space-y-4">
              {filteredRepositories.length > 0 ? (
                filteredRepositories.map((repo) => (
                  <div
                    key={repo._id}
                    className="border-b border-gray-700 pb-3"
                  >
                    <h3 className="text-green-400 font-semibold">
                      {repo.repoName}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {repo.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No repositories found
                </p>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-[#161b22] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
              Upcoming Events
            </h2>

            <ul className="space-y-4 text-gray-300">
              <li>• Tech Conference - Dec 15</li>
              <li>• Developer Meetup - Dec 25</li>
              <li>• React Summit - Jan 5</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;