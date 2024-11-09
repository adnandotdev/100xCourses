import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(location.state); 
  const courseId = course.id;
  const [thumbnail, setThumbnail] = useState(course.imgBlob);
  const [courseTitle, setCourseTitle] = useState(course.courseTitle);
  const [courseDescription, setCourseDescription] = useState(course.courseDescription);
  const [originalPrice, setOriginalPrice] = useState(course.originalPrice);
  const [offerPrice, setOfferPrice] = useState(course.offerPrice);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setCourseTitle(value);
    if (name === "description") setCourseDescription(value);
    if (name === "originalPrice") setOriginalPrice(value);
    if (name === "offerPrice") setOfferPrice(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("courseId", courseId);
    formData.append("courseTitle", courseTitle);
    formData.append("courseDescription", courseDescription);
    formData.append("originalPrice", originalPrice);
    formData.append("offerPrice", offerPrice);
    formData.append("thumbnail", thumbnail)
  //   const data = {
  //     courseId,
  //     courseTitle,
  //     courseDescription,
  //     originalPrice,
  //     offerPrice,
  // }

    try {
      const response = await fetch(`${backendUrl}/update-course`, {
        method: "POST",
        credentials: "include",
        // headers: {
        //   "Content-Type": "application/json", 
        // },
        body: formData,
      });

      if (response.ok) {

        navigate("/admin/courses"); 
      } else {
        console.error("Error adding course:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // useEffect(() => {
  //   if (course.imgBlob) {
  //     const image = URL.createObjectURL(course.imgBlob);
  //     setThumbnail(course.imgBlob);
  //   }
  // }, [course.imgBlob]);

  return (
    <div className="max-w-4xl mt-10 md:w-3/4 lg:w-1/2 mx-auto py-12 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        Update Course
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex flex-col w-full md:w-1/2 ">
            <div className="course-title w-full  mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Course Title
              </label>
              <textarea
                id="name"
                name="name"
                type="text"
                value={courseTitle}
                onChange={handleChange}
                required
                className="mt-1 block w-full h-10 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                placeholder="Enter course name"
              >
                {courseTitle}
              </textarea>
            </div>
            <div className="description w-full  mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                type="text"
                value={courseDescription}
                required
                onChange={handleChange}
                className="mt-1 aspect-video block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
                placeholder="Enter course description"
              >
                {courseDescription}
              </textarea>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 ">
            <div className="upload-img w-full  mb-4">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700"
              >
                Upload Thumbnail
              </label>
              <input
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="preview w-full mb-4 overflow-hidden">
              <label className="block text-sm font-medium text-gray-700">
                Thumbnail Preview
              </label>
              <div className="mt-1 w-full aspect-video border border-gray-300 rounded-md flex items-center justify-center bg-gray-100">
                {thumbnail ? (
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-500">No image uploaded</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-1/2 ">
            <label
              htmlFor="originalPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Original Price (INR)
            </label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              step="0.01"
              value={originalPrice} 
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter original price"
            />
          </div>
          <div className="w-full md:w-1/2 ">
            <label
              htmlFor="offerPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Offer Price (INR)
            </label>
            <input
              id="offerPrice"
              name="offerPrice"
              type="number"
              step="0.01"
              value={offerPrice} 
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter offer price"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}
