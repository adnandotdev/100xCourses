import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import Home from "./root/pages/Home";
import Courses from "./root/pages/Courses";
import MyLearning from "./root/pages/MyLearning";
import Contact from "./root/pages/Contact";
import CoursePage from "./root/pages/CoursePage";
import Profile from "./root/pages/Profile";
import Course from "./root/pages/Course";
import AdminHome from "./root/adminpages/AdminHome";
import AdminCourses from "./root/adminpages/AdminCourses";
import EditCourse from "./root/adminpages/EditCourse";
import AddCourse from "./root/adminpages/AddCourse";
import CourseDashboard from "./root/adminpages/CourseDashboard";
import AdminRootlayout from "./root/AdminRootLayout";
import AuthLayout from "./root/AuthLayout";
import SignIn from "./auth/userAuth/Signin";
import SignUp from "./auth/userAuth/Signup";
import AdminSignIn from "./auth/adminAuth/AdminSignIn";
import AdminProfile from "./root/adminpages/AdminProfile";



function App() {
  return (
    <main classsName="flex h-screen">
      <Routes>
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route element={<AuthLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/page" element={<CoursePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gotocourse" element={<Course />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin" element={<AdminRootlayout />}>
          <Route index element={<AdminHome />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="edit" element={<EditCourse />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="course-dashboard" element={<CourseDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
