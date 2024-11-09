import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [show, setShow] = useState(false); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


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
      }
    };
    checkAuth();
    setShow(true); 
  }, []);

  const navigate = useNavigate();

  return (
    <div
      className={`bg-gradient-to-r w-full from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <section className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl p-8">
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="./assets/online-learning.png"
            alt="Courses"
            className="w-full h-auto rounded-xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-6 text-indigo-900 leading-tight">
            Unlock Your Potential with{" "}
            <span className="text-blue-600">Expert Courses</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Learn the skills you need to succeed in today’s competitive world.
            From coding to business strategy, we’ve got everything to help you
            excel!
          </p>
          <button
            onClick={() => {
              navigate("courses");
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white  dark:bg-indigo-500 hover:bg-indigo-800 rounded-full shadow-lg hover:shadow-xl hover:bg-gradient-to-l transition-all duration-300"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <section className="w-full max-w-7xl p-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose Our Courses?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Expert Instructors
            </h3>
            <p className="text-gray-600">
              Learn from professionals who have years of real-world experience.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Learn Anytime, Anywhere
            </h3>
            <p className="text-gray-600">
              Access courses on-demand with complete flexibility in your
              schedule.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Certification of Completion
            </h3>
            <p className="text-gray-600">
              Earn a certificate to showcase your expertise and boost your
              career.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl p-8 bg-indigo-50 rounded-xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-gray-700 italic mb-4">
              "This platform has transformed my career. I can't recommend it
              enough!"
            </p>
            <h4 className="text-xl font-bold text-gray-800">– Emily Clark</h4>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-gray-700 italic mb-4">
              "The flexibility of learning at my own pace made a big difference
              for me."
            </p>
            <h4 className="text-xl font-bold text-gray-800">– David Foster</h4>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <p className="text-gray-700 italic mb-4">
              "Amazing instructors and a fantastic learning experience!"
            </p>
            <h4 className="text-xl font-bold text-gray-800">– Rachel Green</h4>
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl p-8 text-center bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg mt-12">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8">
          Join thousands of learners who are improving their skills and
          transforming their careers with us.
        </p>
        <button
          onClick={() => {
            navigate("courses");
          }}
          className="px-8 py-4 dark:bg-white text-indigo-600 border border-white font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
          Explore Courses
        </button>
      </section>

      <footer className="w-full max-w-7xl p-8 text-center text-gray-600 mt-12">
        &copy; 2024 EduCourses. All rights reserved.
      </footer>
    </div>
  );
}
