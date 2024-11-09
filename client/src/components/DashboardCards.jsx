import React from "react";

export default function DashboardCards(props) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-xl transform hover:scale-105 transition duration-300 ease-in-out">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-semibold text-gray-700">{props.title}</h2>
      </div>
      <div className="text-3xl font-bold text-gray-900">{props.number}</div>
    </div>
  );
}
