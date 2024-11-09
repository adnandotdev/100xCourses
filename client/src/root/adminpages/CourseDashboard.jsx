import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import RecentCourses from "../../components/RecentCourses";
import DashboardCards from "../../components/DashboardCards";

export default function CourseDashboard() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [show, setShow] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);


  const [course, setCourse] = useState(location.state || {});
  // const courseId = course.id;
  const [updatedCourse, setUpdatedCourse] = useState({
    offerPrice: 0,
    originalPrice: 0,
    users: [],
    totalRevenuePerCourse: 0,
  });
  const learningOutcomes = [
    "Build real-world web applications using cutting-edge technologies",
    "Develop the skills to continuously learn and grow as a developer long after the course",
    "Create a blog application from scratch using Express, MongoDB, and Semantic UI",
    "Design and deploy static HTML and CSS portfolio sites and landing pages",
    "Cultivate the mindset to think like a developer and become proficient at Googling code questions",
    "Master the art of creating complex HTML forms with built-in validations",
    "Build web applications with full authentication and authorization functionalities",
    "Leverage Bootstrap to create responsive and visually appealing layouts",
    "Implement dynamic and responsive navigation bars on your websites",
    "Understand the fundamentals of JavaScript variables, conditionals, loops, and functions",
    "Write and optimize JavaScript functions, including scope and higher-order functions",
    "Develop full-stack web applications from the ground up",
    "Efficiently manipulate the Document Object Model (DOM) using vanilla JavaScript",
    "Enhance your DOM manipulation skills using jQuery for added functionality",
    "Gain the ability to translate code between jQuery and vanilla JavaScript",
    "Create engaging projects like JavaScript-based browser games",
    "Use NodeJS to write server-side JavaScript, enhancing backend development skills",
    "Build sophisticated web apps with multiple models, relationships, and data associations",
    "Develop a complete real-world application using all the technologies covered in the course",
    "Utilize Express and MongoDB to create scalable full-stack JavaScript applications",
    "Understand the principles of RESTful APIs and integrate them into your projects",
    "Implement authentication strategies such as JWT and sessions for secure web apps",
    "Use Git and GitHub for version control and collaboration on projects",
    "Deploy applications to cloud platforms like Heroku and Vercel",
    "Optimize web apps for performance, scalability, and SEO best practices",
    "Learn to use developer tools to debug and optimize your code",
    "Understand asynchronous JavaScript, including Promises, async/await, and callbacks",
    "Master the usage of modern JavaScript ES6+ features like arrow functions, destructuring, and modules",
    "Build and use APIs to interact with third-party services and data",
    "Utilize Webpack and other bundlers to optimize front-end assets",
    "Understand the basics of DevOps and automated deployment pipelines",
    "Collaborate effectively on team projects and manage code with best practices",
    "Implement real-time web features using WebSockets and Socket.io",
    "Create and handle custom middleware in Express for better control of request processing",
    "Learn how to work with NoSQL databases like MongoDB to store and retrieve data",
    "Implement file uploads, image storage, and handling in web apps",
    "Get comfortable with command-line interfaces (CLI) for efficient development",
    "Set up environment variables for securely managing sensitive data",
  ];

  // const [totalRevenue, setTotalRevenue] = useState(0);
  // let revenue = 0;
  // courses.map((course) => {
  //   revenue += course.totalRevenuePerCourse;
  // });
  const handleEditButton = () => {
    navigate("/admin/edit", {
      state: {
        id: course.id,
        courseId: course.id,
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        offerPrice: course.offerPrice,
        originalPrice: course.originalPrice,
        rating: course.rating,
        imgBlob: course.imgBlob,
      },
    });
  };
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${backendUrl}/course-dashboard`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId: course.id }),
        });
        if (!response.ok) {
          navigate("/admin/signin");
          return;
        }
        const data = await response.json();
        setUpdatedCourse(data.course);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    checkAuth();
    setShow(true);
  }, []);
  return (
    <div
      className={`w-full bg-gray-50 py-5 min-h-screen transition-all duration-500 ${
        show ? "opacity-500 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* // <div className="bg-gray-50 w-full min-h-screen py-5"> */}
      <div className="flex justify-between">
        <div className="px-6 py-4 sm:px-8">
          <h1 className="text-4xl font-extrabold text-gray-800">
            {course.courseTitle}
          </h1>
          <p className="text-gray-500 mt-1">{course.courseDescription}</p>
        </div>
        <div className="px-6 py-4 sm:px-8 ">
          <button
            onClick={handleEditButton}
            className="inline-flex justify-center items-center px-4 py-2 bg-indigo-700 hover:bg-indigo-900 text-white rounded-md shadow-md"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCards
            title="Offer Price"
            number={`₹${updatedCourse.offerPrice}`}
          />
          <DashboardCards
            title="Original Price"
            number={`₹${updatedCourse.originalPrice}`}
          />
          <DashboardCards
            title="Total Students"
            number={updatedCourse.users.length}
          />
          <DashboardCards
            title="Total Revenue"
            number={`₹${updatedCourse.totalRevenuePerCourse}`}
          />
        </div>

        
        <section className="w-full max-w-7xl p-8 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Course Content
        </h2>

        <div
          className={`overflow-hidden transition-max-height duration-300 ${
            isExpanded ? "max-h-full" : "max-h-40"
          }`}
        >
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-left mx-4">
            {learningOutcomes.map((outcome, index) => (
              <li
                key={index}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </section>
      </div>
    </div>
  );
}
