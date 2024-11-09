const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const adminModel = require("./models/admin");
const courseModel = require("./models/course");
const userModel = require("./models/user");
const { upload } = require("./config/multerconfig");
const Razorpay = require('razorpay');
const crypto = require('crypto');
  

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"], 
  allowedHeaders: "Content-Type,Authorization", 
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello World nljb");
});
const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

app.post('/create-order', isUserLoggedIn, async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100,
    currency:'INR',
  };
  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating order');
  }
});

app.post('/verify-payment', isUserLoggedIn, async (req, res) => {
  const { order_id, payment_id, signature, courseId } = req.body;


  const generated_signature = crypto
    .createHmac('sha256', process.env.RZP_KEY_SECRET)
    .update(order_id + '|' + payment_id)
    .digest('hex');

  if (generated_signature !== signature) {
    return res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
  }

  try {
    const user = req.user;
    const course = await courseModel.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const admin = await adminModel.findById(course.adminId);
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const boughtPrice = course.offerPrice;

    if (!admin.users.includes(user.id)) {
      admin.users.push(user.id);
    }
    admin.totalRevenue += boughtPrice;
    await admin.save();

    if (!user.courses.includes(courseId)) {
      user.courses.push(courseId);
      await user.save();
    }

    if (!course.users.includes(user.id)) {
      course.users.push(user.id);
    }
    course.totalRevenuePerCourse += boughtPrice;
    await course.save();

    res.status(200).json({ status: 'success', message: 'Course purchased successfully' });
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ status: 'failure', message: 'Error in processing purchase' });
  }
});
// app.post("/buy-course", isUserLoggedIn, async (req, res) => {
//   const user = req.user;
//   if (user) {
//     // const user = await userModel.findById(req.user.id);
//     const courseId = req.body.courseId;
//     const course = await courseModel.findById(courseId);
//     const boughtPrice = course.offerPrice;
//     const adminId = course.adminId;
//     const admin = await adminModel.findById(adminId);
//     if (!admin.users.includes(user.id)) {
//       admin.users.push(user.id);
//     }
//     admin.totalRevenue += boughtPrice;
//     admin.save();
//     user.courses.push(courseId);
//     user.save();
//     course.users.push(user.id);
//     course.totalRevenuePerCourse += boughtPrice;
//     course.save();
//     return res.status(200).json({
//       message: "Course added to user",
//     });
//   }
// });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const isUser = await userModel.findOne({ email });
  if (isUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  let user = await userModel.create({
    name,
    email,
    password: hashedpassword,
  });
  if (user) {
    const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    return res.status(200).json({
      message: "Signup successful",
    });
  } else {
    return res.status(500).json({
      message: "Signup failed",
    });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Invalid credentials",
    });
  }
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      // domain: '.vercel.app',
      // path: '/'
    });
    return res.status(200).json({
      message: "Login successful",
      // user: {
      //   id: user._id,
      //   email: user.email,
      //   name: user.name,
      // },
    });
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
});
app.get("/checkUserAuth", isUserLoggedIn, async (req, res) => {
  if (req.user) {
    user = req.user;
    return res.status(200).json({
      user,
      message: "User is logged in",
    });
  } else {
    return res.status(401).json({});
  }
});
app.get("/user-profile", isUserLoggedIn, async (req, res) => {
  const isUser = req.user;
  if (isUser) {
    const user = await userModel.findById(req.user.id).populate("courses");
    const courses = user.courses;
    return res.status(200).json({ user, courses });
  } else {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }
});
app.get("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  return res.status(200).json({
    message: "Logged out successfully",
  });
});

app.get("/allcourses", isUserLoggedIn, async (req, res) => {
  const courses = await courseModel.find();
  const user = req.user || null;
  res.json({ courses, user });
});
app.get("/my-learning", isUserLoggedIn, async (req, res) => {
  const isUser = req.user || null;
  if (isUser) {
    const user = await userModel.findById(req.user.id).populate("courses");
    const courses = user.courses;
    return res.status(200).json({ courses });
  } else {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }
});
// if auth-true GoTo / BuyNow else BuyNow
app.post("/course-page", isUserLoggedIn, async (req, res) => {
  const user = req.user || null;
  const courseId = req.body.courseId;

  const course = await courseModel.findById(courseId);
  res.json({ course, user });
});
app.post("/buy-course", isUserLoggedIn, async (req, res) => {
  const user = req.user;
  if (user) {
    // const user = await userModel.findById(req.user.id);
    const courseId = req.body.courseId;
    const course = await courseModel.findById(courseId);
    const boughtPrice = course.offerPrice;
    const adminId = course.adminId;
    const admin = await adminModel.findById(adminId);
    if (!admin.users.includes(user.id)) {
      admin.users.push(user.id);
    }
    admin.totalRevenue += boughtPrice;
    admin.save();
    user.courses.push(courseId);
    user.save();
    course.users.push(user.id);
    course.totalRevenuePerCourse += boughtPrice;
    course.save();
    return res.status(200).json({
      message: "Course added to user",
    });
  }
});
async function isUserLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const isUser = await userModel.findById(data.id).select("-password");
      if (isUser) {
        req.user = isUser;
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized - Invalid token",
        });
      }
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }
  } else {
    next();
    // return res.status(401).json({
    //   message: "Unauthorized - No token",
    // });
  }
}
//-------------------Below are the routes for admin----------------------------------

app.get("/admin-create", async (req, res) => {
  let name = "100xAdmin";
  let email = "admin@100xcourses.com";
  let password = "1111";
  const isUser = await adminModel.findOne({ email });
  if (isUser) {
    return res.status(400).json({
      message: "Admin already exists",
    });
  }
  const hashedpassword = await bcrypt.hash(password, 10);
  let admin = await adminModel.create({
    name,
    email,
    password: hashedpassword,
  });
  res.send(admin);
});
app.post("/admin-signin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });
  if (!admin) {
    return res.status(404).json({
      message: "Admin not found",
    });
  }
  const result = await bcrypt.compare(password, admin.password);
  if (result) {
    const token = jwt.sign({ email, id: admin._id }, process.env.SECRET_KEY);
    res.cookie("admin-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    return res.status(200).json({
      message: "Login successful",
      // admin: {
      //   id: admin._id,
      //   email: admin.email,
      //   name: admin.name,
      // },
    });
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
});
app.get("/admin-rootlayout", isAdminLoggedIn, async (req, res) => {
  const admin = req.admin;
  res.status(200).json({
    message: "Welcome to Admin Dashboard",
    admin,
  });
});
app.get("/dashboard", isAdminLoggedIn, async (req, res) => {
  const admin = req.admin;
  const courses = await courseModel
    .find({ adminId: admin._id })
    .select("courseTitle users totalRevenuePerCourse");
  return res.status(200).json({ courses, admin });
});
app.get("/admin-courses", isAdminLoggedIn, async (req, res) => {
  const adminId = req.admin._id;
  const courses = await courseModel.find({ adminId });
  res.send(courses);
});
app.get("/add-course-page", isAdminLoggedIn, async (req, res) => {
  // const admin = req.admin;
  // res.send(admin);
  return res.status(200);
});
app.post(
  "/add-course",
  isAdminLoggedIn,
  upload.single("thumbnail"),
  async (req, res) => {
    const { courseTitle, courseDescription, offerPrice, originalPrice } =
      req.body;
    const admin = req.admin;
    try {
      const course = await courseModel.create({
        adminId: admin._id,
        courseTitle,
        courseDescription,
        offerPrice,
        originalPrice,
        thumbnail: req.file.filename,
      });
      admin.courses.push(course._id);
      await admin.save();

      res.status(201).send("Course Added");
    } catch (error) {
      res.status(500).send({ error: "Failed to add course" });
    }
  }
);
app.post(
  "/update-course",
  isAdminLoggedIn,
  upload.single("thumbnail"),
  async (req, res) => {
    const adminId = req.admin._id;
    const {
      courseId,
      courseTitle,
      courseDescription,
      offerPrice,
      originalPrice,
    } = req.body;
    try {
      const course = await courseModel.findOneAndUpdate(
        { _id: courseId },
        {
          courseTitle,
          courseDescription,
          offerPrice,
          originalPrice,
          thumbnail: req.file.filename,
        },
        { new: true }
      );
      res.status(201).send(course);
    } catch (error) {
      res.status(500).send({ error: "Failed to add course" });
    }
  }
);
app.post('/course-dashboard',isAdminLoggedIn, async (req, res) => {
  const courseId = req.body.courseId;
  try {
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({course});
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'An error occurred while fetching the course.' });
  }
});
app.get("/admin-profile", isAdminLoggedIn, async (req, res) => {
  const admin = req.admin;
  if (admin) {
    const admin = await adminModel.findById(req.admin.id);
    return res.status(200).json({ admin });
  } else {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }
});
// app.get("/admin-logout", async (req, res) => {
//   res.clearCookie("admin-token");
//   return res.status(200).json({
//     message: "Logged out",
//   });
// });
app.get("/admin-logout", async (req, res) => {
  res.clearCookie("admin-token", {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  return res.status(200).json({
    message: "Logged out successfully",
  });
});

async function isAdminLoggedIn(req, res, next) {
  const token = req.cookies["admin-token"];
  if (token) {
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      const admin = await adminModel.findById(data.id).select("-password");
      if (admin) {
        req.admin = admin;
        next();
      } else {
        return res.status(401).json({
          message: "Unauthorized - Invalid token",
        });
      } 
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized - No token",
    });
  }
}

app.listen(process.env.PORT);
