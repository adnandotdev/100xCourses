import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchAdmin = async () => {
      const response = await fetch(`${backendUrl}/admin-profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
      } else {
        navigate("/admin");
      }
    };

    fetchAdmin();
  }, [navigate]);

  const handleLogout = async () => {
    const response = await fetch(`${backendUrl}/admin-logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      navigate("/admin/signin");
    }
  };

//   const handleEditProfile = () => {
//     
//     navigate("/edit-admin-profile");
//   };

  if (!admin) {
    return (
     <div className="flex justify-center items-center text-5xl text-indigo-600  w-full min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white w-full shadow-lg rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="bg-black  rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold">
            <h1 className=" text-white">100x</h1>
          </div>
          <div className=" h-24 flex flex-col justify-center md:items-start sm:items-start items-center">
            <h2 className="text-2xl font-semibold">{admin.name}</h2>
            <p className="text-gray-500">{admin.email}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4">
          {/* <button
            onClick={handleEditProfile}
            className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full hover:bg-indigo-600 hover:text-white transition duration-300 w-full sm:w-auto"
          >
            Edit Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 border-2 border-red-600 text-red-600 font-bold rounded-full mt-4 sm:mt-0 hover:bg-red-600 hover:text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
