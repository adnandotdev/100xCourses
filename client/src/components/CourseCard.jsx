import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCard(props) {
  const navigate = useNavigate();
  const [imgBlob, setImgBlob] = useState(null);

  useEffect(() => {
    const fetchImageBlob = async () => {
      try {
        const response = await fetch(props.imgUrl);
        const blob = await response.blob();
        setImgBlob(blob);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImageBlob();
  }, [props.imgUrl]);

  const handleButton = () => {
    navigate(props.buttonPath, {
      state: {
        id: props.id,
        courseTitle: props.courseTitle,
        courseDescription: props.courseDescription,
        offerPrice: props.offerPrice,
        originalPrice: props.originalPrice,
        rating: props.rating,
        imgBlob: imgBlob,
      },
    });
  };
  const handleClickOnCard = () => {
    navigate(props.navigateOnCourse,{
      state: {
        id: props.id,
        courseTitle: props.courseTitle,
        courseDescription: props.courseDescription,
        offerPrice: props.offerPrice,
        originalPrice: props.originalPrice,
        rating: props.rating,
        imgBlob: imgBlob,
      },
    });
  };

  return (
    <div className="bg-white border-2 border-gray-600 rounded-lg shadow-lg w-full max-w-xs mx-auto transition-transform transform hover:scale-105 cursor-pointer">
      <div onClick={handleClickOnCard}>
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <img
            className="absolute rounded-t-lg border-4 border-black top-0 left-0 w-full h-full object-contain"
            src={props.imgUrl}
            alt="Course Thumbnail"
          />
        </div>
        <div className="p-2">
          <h1 className="min-h-[60px] h-20 text-lg sm:text-xl font-semibold overflow-hidden text-indigo-600">
            {props.courseTitle}
          </h1>
          {props.rating ? (
            <div className="flex w-full items-center">
              <label className="text-sm sm:text-lg font-bold text-indigo-600">
                {props.rating}
              </label>
              <span className="text-yellow-500">⭐</span>
              <label className="text-xs sm:text-sm text-gray-500 ml-2">
                (34,570)
              </label>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between">
            <label className="text-lg sm:text-xl font-semibold text-indigo-600">
              ₹{props.offerPrice}
            </label>
            <label className="text-sm sm:text-base text-gray-500 line-through">
              ₹{props.originalPrice}
            </label>
          </div>
        </div>
      </div>
      <div className="p-2">
        <button
          className="w-full  bg-indigo-700 text-white font-semibold py-2 rounded-lg hover:bg-indigo-900 transition-colors text-sm sm:text-base"
          onClick={handleButton}
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}
