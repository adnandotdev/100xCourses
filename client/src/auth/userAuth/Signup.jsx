import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name,
      email,
      password,
    };
    try {
      const response = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        alert(result.message);
        // navigate("/signup");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl px-8 py-6">
      <h1 className="text-3xl font-extrabold text-center mb-4 text-indigo-700">
        Sign Up
      </h1>
      <p className="text-sm text-gray-500 text-center mb-6">
        Create an account to start your learning journey
      </p>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
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
            className="w-full px-4 py-1 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:bg-indigo-500 hover:bg-indigo-800 font-semibold rounded-md hover:from-indigo-700 hover:to-purple-700 transition duration-300 shadow-md"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="text-center mt-4">
        <Link
          to="/signin"
          className="text-indigo-600 font-medium hover:underline"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
