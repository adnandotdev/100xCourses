import React from 'react';
import { Link } from 'react-router-dom';

export default function EnrolledCourses(props) {
  return (
    <div className="mt-8 border rounded-lg p-8 shadow-lg">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-900">Enrolled Courses</h2>
          <p className="mt-2 text-sm text-gray-700">Here are the courses you are enrolled in.</p>
        </div>
      </div>

      {props.courses.length === 0 ? (
        <div className="mt-8 text-center">
          <p className="text-lg font-medium text-gray-900">No courses available.</p>
          <Link to="/courses">
            <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300">
              Browse Courses
            </button>
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-bold text-gray-900 sm:pl-6"
                      >
                        Course Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-center text-sm font-bold text-gray-900"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {props.courses.map((course) => (
                      <tr key={course._id}>
                        <td className="whitespace-nowrap py-4 pl-4 text-center pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {course.courseTitle}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-500">
                          <Link to={`/gotocourse`}>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View Content
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
