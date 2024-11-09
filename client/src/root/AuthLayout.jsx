import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <section className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center text-center p-12 space-y-6 bg-gradient-to-br from-indigo-700 via-purple-700 to-purple-600 text-white dark:bg-indigo-900 shadow-lg lg:shadow-none">
        <h2 className="text-5xl lg:text-6xl font-bold tracking-wide">Welcome to 100xCourses</h2>
        <p className="text-xl lg:text-2xl max-w-md font-light">
          Discover a world of learning with our expertly crafted courses designed to accelerate your skills and career growth.
        </p>
        <p className="text-lg font-medium italic opacity-90">Join us on a journey of endless possibilities!</p>
      </section>
      
      <section className="flex-1 flex justify-center dark:bg-zinc-100 items-center py-8 px-6 lg:px-12">
        <div className="w-full flex justify-center max-w-lg ">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default AuthLayout;
