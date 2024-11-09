import React, { useEffect, useState } from 'react';

export default function Contact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); 
    setShow(true);  
  }, []);

  return (
    <div
      className={`w-full contact-container flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-200 p-8 transition-all duration-500 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-2xl text-center">
        We’re here to help! If you have any questions, feedback, or suggestions, feel free to reach out to us.
      </p>

      <div className="flex flex-col md:flex-col space-y-10 items-center justify-around w-full max-w-4xl mb-12">
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <img
            src="./assets/contactus.png"
            alt="Contact Us"
            className="h-48 w-48 mb-4"
          />
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Get in Touch</h2>
          <p className="text-md text-gray-700 text-center px-4">
            We’re eager to hear from you! Contact us via email or follow us on our social media.
          </p>
        </div>

        <div className="flex flex-col items-center mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Contact Information</h2>
          <p className="text-md text-gray-700 text-center">support@100xcourses.com</p>
          <p className="text-md text-gray-700 text-center">+91 9022875450</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Follow Us</h2>
      <div className="flex space-x-6 mb-8">
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          <img src="./assets/twitter.png" alt="X" className="h-10 w-10" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          <img src="./assets/facebook.png" alt="Facebook" className="h-10 w-10" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          <img src="./assets/instagram.png" alt="Instagram" className="h-10 w-10" />
        </a>
      </div>

      <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Send Us a Message</h2>
      <form className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
 