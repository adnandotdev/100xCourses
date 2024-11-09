import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await fetch(`${backendUrl}/admin-signin`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/admin");
      } else {
        alert(result.message);
        console.error("Admin:", response.statusText);
        navigate("/admin/signin");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 py-6">
        <h1 className="text-3xl font-extrabold text-center mb-4 text-indigo-700">
          Sign In @ Admin
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Access the admin dashboard and manage the platform
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
          >
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
