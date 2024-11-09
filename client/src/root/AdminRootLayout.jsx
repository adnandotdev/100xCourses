import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/admin-rootlayout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          navigate("/admin/signin");
          return;
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    checkAuth();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center text-5xl text-indigo-600  w-full min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="w-full h-full ">
      <AdminNavBar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
    </div>
  );
}
