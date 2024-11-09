import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const toggleMenu = () => {
    // setIsSearchOpen(false);
    setIsOpen(!isOpen);
  };

  // const toggleSearch = () => {
  //   setIsOpen(false);
  //   setIsSearchOpen(!isSearchOpen);
  // };

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`${backendUrl}/checkUserAuth`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setIsAuthenticated(true);
        const data = await response.json();
        setUser(data.user);
      }
    };
    checkAuth();
  }, []);
  useEffect(() => {
    if (user && user.name) {
      const initials = user.name.charAt(0).toUpperCase();
      setUserInitials(initials);
    }
  }, [user]);

  const handleLogout = async () => {
    const response = await fetch(`${backendUrl}/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      setIsAuthenticated(false);
      toggleMenu();
      navigate("/");
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between  h-12">
          <div className="flex w-48 items-center">
            <img className="h-10 mr-1a" src="/assets/logo.png" alt="LOGO" />
            <span className="text-2xl font-bold text-gray-900">
              100xCourses
            </span>
          </div>

          {/* <div className="hidden md:flex flex-grow items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-2/3 px-2 h-8 py-1 border-2 border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div> */}

          <div className="hidden md:flex space-x-4 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " border-indigo-900 text-indigo-900 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
                  : "border-transparent text-indigo-300 hover:border-indigo-300 hover:text-indigo-500 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                isActive
                  ? " border-indigo-900 text-indigo-900 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
                  : "border-transparent text-indigo-300 hover:border-indigo-300 hover:text-indigo-500 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
              }
            >
              Courses
            </NavLink>
            {isAuthenticated && (
              <NavLink
                to="/my-learning"
                className={({ isActive }) =>
                  isActive
                    ? " border-indigo-900 text-indigo-900 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-indigo-300 hover:border-indigo-300 hover:text-indigo-500 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                My Learning
              </NavLink>
            )}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? " border-indigo-900 text-indigo-900 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
                  : "border-transparent text-indigo-300 hover:border-indigo-300 hover:text-indigo-500 inline-flex items-center h-12 px-1 pt-1 border-b-2 text-sm font-medium"
              }
            >
              Contact
            </NavLink>
          </div>

          {isAuthenticated ? (
            <div className=" hidden md:flex w-48 space-x-4 items-center justify-end">
              <div className="relative inline-block group">
                <button className="w-10 flex justify-end overflow-hidden">
                  <img
                    className="w-8 h-full "
                    src="/assets/profile.png"
                    alt="Profile"
                  />
                </button>
                <div className="absolute right-0 w-72 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
                  <ul className="p-2">
                    <li className="flex items-center space-x-3">
                      <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                        {userInitials}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/profile")}
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
              </div>
            </div>
          ) : (
            <div className="hidden md:flex w-48 items-center justify-end space-x-2">
              <button
                onClick={() => navigate("/signin")}
                className="px-3 py-1 border-2 border-indigo-500 text-indigo-500 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-1 border-2 border-indigo-500 text-indigo-500 rounded-full font-bold hover:bg-indigo-500 hover:text-white transition duration-300"
              >
                Signup
              </button>
            </div>
          )}

          <div className="md:hidden flex items-center space-x-2">
            {/* <button
              onClick={toggleSearch}
              className="text-gray-600 focus:outline-none"
            >
              <img src="./assets/search.png" alt="Search" className="w-6" />
            </button> */}
            <button
              onClick={toggleMenu}
              className="text-gray-600 focus:outline-none"
            >
              <img src="/assets/threedot.png" alt="Menu" className="w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* {isSearchOpen && (
        <div className="md:hidden flex items-center p-4 bg-white shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-2 py-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button onClick={toggleSearch} className="ml-2">
            <img src="/assets/cancel.png" alt="Cancel" className="w-5" />
          </button>
        </div>
      )} */}

      {isOpen && (
        <div className="md:hidden absolute w-full flex flex-col bg-white mt-0 shadow-lg">
          <button onClick={toggleMenu} className="self-end absolute mt-0 p-2">
            <img src="../assets/cancel.png" alt="Cancel" className="w-5" />
          </button>
          {isAuthenticated && (
            <NavLink
              to="/profile"
              className="block px-4 py-2"
              onClick={toggleMenu}
            >
              <button className="flex items-center space-x-3">
                <div className="text-white bg-black rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                  {userInitials}
                </div>
                <div className="flex flex-col items-start">
                  <p className="font-bold text-indigo-600">Hi, {user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </button>
            </NavLink>
          )}

          <NavLink
            to="/"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/courses"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
            onClick={toggleMenu}
          >
            Courses
          </NavLink>
          {isAuthenticated && (
            <NavLink
              to="/my-learning"
              className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
              onClick={toggleMenu}
            >
              My Learning
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-100"
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
          {isAuthenticated ? (
            <div className="flex flex-col px-4 items-center mt-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full mb-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col px-4 items-center mt-4">
              <button
                onClick={() => navigate("/signin")}
                className="w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full mb-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full px-4 py-2 mb-2 border-2 border-indigo-600 text-indigo-600 font-bold rounded-full"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
