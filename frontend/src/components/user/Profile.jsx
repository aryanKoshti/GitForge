import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/userProfile/${userId}`
        );

        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0d1117] text-white flex justify-center items-center">
          Loading Profile...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0d1117] text-white px-8 py-10">

        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="bg-[#161b22] rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">

            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-bold">
                {user.username}
              </h1>

              <p className="text-gray-400 mt-2">
                {user.email}
              </p>

              <div className="flex gap-8 mt-6">

                <div>
                  <h3 className="font-bold text-lg">
                    {user.repositories?.length || 0}
                  </h3>
                  <p className="text-gray-400">
                    Repositories
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    {user.followersUsers?.length || 0}
                  </h3>
                  <p className="text-gray-400">
                    Followers
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    {user.starRepo?.length || 0}
                  </h3>
                  <p className="text-gray-400">
                    Stars
                  </p>
                </div>

              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg">
              Edit Profile
            </button>

          </div>

          {/* Contribution Graph */}
          <div className="bg-[#161b22] rounded-xl p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">
              Contributions
            </h2>

            <div className="grid grid-cols-12 gap-2">

              {Array.from({ length: 84 }).map((_, index) => {

                const random =
                  Math.floor(Math.random() * 4);

                const colors = [
                  "bg-gray-800",
                  "bg-green-900",
                  "bg-green-700",
                  "bg-green-500",
                ];

                return (
                  <div
                    key={index}
                    className={`w-5 h-5 rounded-sm ${colors[random]}`}
                  />
                );
              })}

            </div>

            <p className="text-gray-400 mt-4">
              Mock contribution graph
            </p>

          </div>

          {/* Repositories */}
          <div className="bg-[#161b22] rounded-xl p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">
              Repositories
            </h2>

            {user.repositories?.length === 0 ? (
              <p className="text-gray-400">
                No repositories found
              </p>
            ) : (
              user.repositories.map((repo) => (
                <div
                  key={repo._id}
                  className="border-b border-gray-700 py-4"
                >
                  <h3 className="text-blue-400 font-semibold">
                    {repo.repoName}
                  </h3>
                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default Profile;