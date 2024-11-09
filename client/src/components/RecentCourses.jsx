import React from 'react';
import { Link } from 'react-router-dom';

export default function RecentCourses(props) {
  const courses = [
    { id: 1, name: 'React Fundamentals', students: 120, revenue: '$2,400' },
    { id: 2, name: 'Advanced JavaScript', students: 85, revenue: '$1,700' },
    { id: 3, name: 'CSS Mastery', students: 95, revenue: '$1,900' },
    { id: 4, name: 'Node.js Basics', students: 75, revenue: '$1,500' },
    { id: 5, name: 'Python for Beginners', students: 150, revenue: '$3,000' },
  ];

  return (
    <div className="mt-8">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Recent Courses</h2>
          <p className="mt-2 text-sm text-gray-700">Here are your most recently added or updated courses.</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="/admin/add">
            <button className="inline-flex justify-center items-center px-4 py-2 bg-indigo-700 hover:bg-indigo-900 text-white rounded-md shadow-md ">
              Add Course ++
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-gray-900 sm:pl-6">Course Name</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-gray-900">Students</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-gray-900">Revenue</th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {props.courses.map((course) => (
                    <tr key={course._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{course.courseTitle}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{course.users.length}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">₹{course.totalRevenuePerCourse}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
