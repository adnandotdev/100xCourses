import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentCourses from "../../components/RecentCourses";
import DashboardCards from "../../components/DashboardCards";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [admin, setAdmin] = useState({ users: [], totalRevenue: 0 });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/dashboard`, {
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
        const data = await response.json();
        setCourses(data.courses);
        setAdmin(data.admin);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    checkAuth();
    setShow(true);
  }, []);

  return (
    <div
      className={`bg-gray-50 w-full min-h-screen py-5 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="px-6 py-4 sm:px-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome to your course management dashboard
        </p>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCards
            title="Total Courses"
            number={courses.length}
            description={`+${courses.length} from last month`}
          />
          <DashboardCards
            title="Total Students"
            number={admin.users.length}
            description="+15% from last month"
          />
          <DashboardCards
            title="Total Revenue"
            number={`₹${admin.totalRevenue}`}
            description="+5% from last month"
          />
        </div>

        <div className="mt-10">
          <RecentCourses courses={courses} />
        </div>
      </div>
    </div>
  );
}
