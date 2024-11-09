import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CoursePage = (props) => {
  const location = useLocation();
  const [course, setCourse] = useState(location.state);
  const [courseAlreadyPresent, setCourseAlreadyPresent] = useState(false);
  const [button, setButton] = useState("Buy Now");
  const [buttonPath, setButtonPath] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(false); 
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkAuth = async () => {
      const response = await fetch(`${backendUrl}/course-page`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: course.id }),
      });
      const data = await response.json();
      if (data.user) {
        setIsAuthenticated(true);
        if (data.user.courses.includes(course.id)) {
          setCourseAlreadyPresent(true);
          setButton("Continue Learning");
          setButtonPath("/gotocourse");
        }
      }
      // if (response.ok) {
      //   setIsAuthenticated(true);
      // }
    };
    checkAuth();
    setShow(true); 
  }, [course]);
  const handleButton = async () => {
    if (isAuthenticated) {
      if (courseAlreadyPresent) {
        navigate(buttonPath, { state: course });
        return;
      }
      // const response = await fetch(`${backendUrl}/buy-course`, {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ courseId: course.id }),
      // });
      setIsLoading(true);
      const response = await fetch(`${backendUrl}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: course.offerPrice }),
        credentials: "include",
      });
      const order = await response.json();

      const options = {
        key: import.meta.env.RZP_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: "100xCourses",
        description: "Purchase Description",
        order_id: order.id,
        handler: function (response) {
          fetch(`${backendUrl}/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              courseId: course.id,
            }),
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "success") {

                alert("Payment verified successfully");
                navigate("/my-learning");
              } else {
                alert("Payment verification failed");
              }
            });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsLoading(false);
      // if (response.ok) {
      //   navigate("/my-learning");
      // }
    } else {
      alert("Please sign in to continue");
      navigate("/signin");
    }
  };

  const courseTitle = "The Web Developer Bootcamp 2024";
  const courseDescription =
    "10 Hours of React just added. Become a Developer with ONE course - HTML, CSS, JavaScript, React, Node, MongoDB, and More!";
  const studentCount = "923,109 students";
  const createdBy = "Created by John Doe";

  const discount =
    Math.round(
      ((course.originalPrice - course.offerPrice) / course.originalPrice) * 100
    ) + "% off";
  const priceValidity = "1 day left at this price!";
  const guarantee = "30-Day Money-Back Guarantee";

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
    "Set up environment variables for securely managing sensitive data"
  ];
  
  const courseFeatures = [
    {
      title: "Expert Instructors",
      description: "Learn from professionals with real-world experience.",
    },
    {
      title: "Flexible Learning",
      description: "Access courses anytime, anywhere at your own pace.",
    },
    {
      title: "Certification",
      description: "Earn a certificate to showcase your expertise.",
    },
  ];

  const ctaTitle = "Join Thousands of Students";
  const ctaDescription = "Transform your career with our expert courses.";

  const footerText = "&copy; 2024 EduCourses. All rights reserved.";

  return (
    <div
      className={`bg-gradient-to-r w-full from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        show ? "opacity-500 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <header className="w-full items-start max-w-7xl p-8">
        <h1 className="text-5xl font-extrabold text-indigo-900 my-4">
          {course.courseTitle}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{course.courseDescription}</p>
        <span className="text-gray-600">
          {studentCount} | {createdBy}
        </span>
      </header>

      <section className="w-full max-w-7xl p-8 flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg mt-6">
        <div className="md:w-1/2 p-6 space-y-3">
          <div className="text-2xl font-bold text-green-600 mb-2">
            Current Price: {course.offerPrice}
          </div>
          <div className="line-through text-gray-500 mb-2">
            Original Price: {course.originalPrice}
          </div>
          <div className="text-red-600 mb-4">{discount}</div>
          <p className="text-sm text-gray-600">{priceValidity}</p>
          <p className="text-gray-700 mb-4">{guarantee}</p>
          <button
            onClick={handleButton}
            className="w-auto px-4 bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : button}
          </button>
        </div>
        <div className="items-center justify-center flex md:w-1/2 mt-8 md:mt-0">
          <img
            src={URL.createObjectURL(course.imgBlob)} 
            alt="Web Development"
            className="w-full h-full max-h-96 object-contain  rounded-md transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </section>

      <section className="w-full max-w-7xl p-8 bg-white rounded-lg shadow-md mt-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-900">
          What You'll Learn
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

      <section className="w-full max-w-7xl p-8 bg-indigo-50 rounded-lg mt-6 shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Course Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {courseFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-7xl p-8 text-center mt-6">
        <h2 className="text-3xl font-bold mb-4">{ctaTitle}</h2>
        <p className="text-gray-700 mb-8">{ctaDescription}</p>
        <button
          onClick={() => {
            navigate("/courses");
          }}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Explore Courses
        </button>
      </section>

      <footer className="w-full max-w-7xl p-8 text-center text-gray-600 mt-12">
        {footerText}
      </footer>
    </div>
  );
};

export default CoursePage;
