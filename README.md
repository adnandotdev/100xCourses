# 100xCourses - MERN Stack Course Selling Platform


## 📚 Project Overview
100xCourses is a full-featured course selling platform built using the MERN stack (MongoDB, Express, React, Node.js). It includes separate interfaces for users and admins with secure authentication, course management, and payment integration via Razorpay.

### 🚀 Live Links
- **User Platform**: [100xCourses](https://100x-courses.vercel.app)
- **Admin Dashboard**: [Admin Portal](https://100x-courses.vercel.app/admin)  (Demo credentials are provided below)

***Demo credentials for admin***
```
email: admin@100xcourses.com
password: 1111

```

## 🛠️ Features
- **User Side**
  - Browse and purchase courses.
  - Secure payment processing via Razorpay.
  - Access purchased courses.

- **Admin Side**
  - Add, edit, and delete courses.
  - Track revenue and manage user enrollments.
  - View real-time analytics via dashboard.

- **General**
  - Secure authentication and authorization.
  - Responsive design using React and TailwindCSS.
  - Backend with Express.js, MongoDB, and JWT for secure data management.

## 🖥️ Tech Stack
- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, JWT, Razorpay
- **Deployment**: Vercel 

## 📸 Screenshots

### User Dashboard
![User Dashboard]![{32D9B619-E9A4-4379-B0BF-05B90A36F103}](https://github.com/user-attachments/assets/8726b697-c3b3-4120-9f86-9aa577a8cacf)


### Admin Dashboard
![Admin Dashboard]![{18E45A06-C5B1-482E-8D02-2FFBF5F079D6}](https://github.com/user-attachments/assets/4db24294-e881-49ea-8f5c-ac32366d174e)


### Payment Integration
![Payment Integration]![{D864D1E8-AAF2-4A51-AC1A-FBCFAAA8D200}](https://github.com/user-attachments/assets/dacbabdf-a390-4f3a-b245-a815cbdc4408)


## ⚙️ Installation & Setup

 **Clone the repository**
```
   git clone https://github.com/adnandotdev/100xCourses.git
   cd 100xCourses
```

**Frontend Setup**
- Create a .env file in the client directory and add the following:
```
VITE_BACKEND_URL=http://localhost:4000
RZP_KEY_ID=<Your Razorpay Key ID>
```
- Install dependencies and run the frontend:
```
cd client
npm install
npm run dev
```

**Backend Setup**
- Create a .env file in the server directory and add the following:
```
SECRET_KEY=<Your Secret Key>
PORT=4000
RZP_KEY_ID=<Your Razorpay Key ID>
RZP_KEY_SECRET=<Your Razorpay Key Secret>
FRONTEND_URL=http://localhost:5173
MONGO_URL=<Your MongoDB Connection String>
```
- Install dependencies and run the backend:
```
cd server
npm install
npm run dev
```
**Run the Application**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

  ## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is licensed under the MIT License.

## ✨ Acknowledgements
- Vite
- TailwindCSS
- Razorpay


