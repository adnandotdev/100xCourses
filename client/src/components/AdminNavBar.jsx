import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function AdminNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-12" src="/assets/100xAdmin1.png" alt="" />
              <span className="ml-2 text-2xl font-bold text-gray-900">
                100xAdmin
              </span>
            </div>

            <div className="hidden md:flex space-x-8 ml-6">
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/admin/courses"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                My Courses
              </NavLink>
              <NavLink
                to="/admin/add"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Add Courses
              </NavLink>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="w-10 flex justify-end overflow-hidden">
                <img
                  className="w-8 h-full "
                  src="/assets/profile.png"
                  alt="Profile"
                />
              </button>
              <div className="absolute right-0 w-auto bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                  <ul className="p-2">
                    <li>
                      <button
                        onClick={() => navigate("/admin/profile")}
                        className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/settings")}
                        className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full t px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
            

              {/* {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )} */}
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <img src="../assets/threedot.png" alt="Menu" className="w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute w-full flex flex-col bg-white shadow-lg py-4">
          <button onClick={toggleMenu} className="self-end absolute p-2">
            <img src="../assets/cancel.png" alt="Cancel" className="w-5" />
          </button>
          <NavLink
            onClick={toggleMenu}
            to="/admin/profile"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
          >
            My Profile
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/admin"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
          >
            Dashboard
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/admin/courses"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
          >
            My Courses
          </NavLink>
          <NavLink
            onClick={toggleMenu}
            to="/admin/add"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
          >
            Add Courses
          </NavLink>
          <div className="flex flex-col px-4 items-center mt-4">
            <button onClick={handleLogout} className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full mb-2">
              Logout
            </button>
            {/* <button className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full">Signup</button> */}
          </div>
        </div>
      )}
    </nav>
  );
}
