import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(false); 
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      const response = await fetch(`${backendUrl}/allcourses`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCourses(data.courses.reverse());
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    };
    fetchCourses();

    setShow(true);
  }, []);

  const getButton = (courseId) => {
    if (!isAuthenticated) {
      return { buttonText: "View Details", buttonPath: "/courses/page" };
    }
    if (user && user.courses.includes(courseId)) {
      return { buttonText: "Go to course", buttonPath: "/gotocourse" };
    }
    return { buttonText: "View Details", buttonPath: "/courses/page" };
  };

  return (
    <section
      className={`w-full min-h-screen p-2 bg-gradient-to-r from-indigo-100 to-blue-100 transition-all duration-500 ${
        show ? "opacity-500 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h1 className="text-3xl m-4 md:text-4xl font-bold text-indigo-800">All Courses</h1>
      <div className="m-4 w-full mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => {
          const { buttonText, buttonPath } = getButton(course._id);
          return (
            <CourseCard
              key={course._id}
              id={course._id}
              imgUrl={`${import.meta.env.VITE_BACKEND_URL}/public/temp/${course.thumbnail}`}
              courseTitle={course.courseTitle}
              courseDescription={course.courseDescription}
              rating={true}
              offerPrice={course.offerPrice}
              originalPrice={course.originalPrice}
              buttonText={buttonText}
              buttonPath={buttonPath}
              navigateOnCourse={"/courses/page"}
            />
          );
        })}
      </div>
    </section>
  );
}
