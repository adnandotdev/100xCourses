import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/CourseCard";

export default function MyLearning() {
  const [courses, setCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(false);  
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      const response = await fetch(`${backendUrl}/my-learning`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses.reverse());
      } else {
        navigate("/signin");
      }
    };
    fetchCourses();
    setShow(true); 
  }, [navigate, backendUrl]);

  return (
    <section
      className={`w-full min-h-screen p-2 bg-gradient-to-r from-indigo-100 to-blue-100 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h1 className="text-3xl m-4 md:text-4xl font-bold text-indigo-800">My Learning</h1>
      <div className="m-4 w-full mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => {
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
                buttonText={"Go to course"}
                buttonPath={"/gotocourse"}
                navigateOnCourse={"/courses/page"}
              />
            );
          })
        ) : (
          <div className="col-span-full text-center py-10">
            <h2 className="text-xl font-semibold text-indigo-600">No Courses Available!</h2>
            <p className="text-gray-500">You haven't enrolled in any courses yet. Start exploring our offerings!</p>
            <button
              onClick={() => navigate("/courses")}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
