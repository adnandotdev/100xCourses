import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`${backendUrl}/admin-courses`, {
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
      setCourses(data.reverse());
    };

    fetchCourses();

    setShow(true);
  }, []);

  return (
    <div
      className={`m-10 w-full mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ${
        show ? "opacity-500 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {courses.map((course) => (
        <CourseCard
          key={course._id}
          id={course._id}
          imgUrl={`${import.meta.env.VITE_BACKEND_URL}/public/temp/${course.thumbnail}`}
          courseTitle={course.courseTitle}
          courseDescription={course.courseDescription}
          rating={true}
          offerPrice={course.offerPrice}
          originalPrice={course.originalPrice}
          buttonText={"Edit course details"}
          buttonPath="/admin/edit"
          navigateOnCourse="/admin/course-dashboard"
        />
      ))}
    </div>
  );
}
 