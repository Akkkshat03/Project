# 🏨 WanderLust — Full Stack Hotel Booking Platform

> A production-ready accommodation booking platform featuring property listings, search filters, reservation management, and secure JWT authentication.

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Deployed on Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## 🌐 Live Demo

🔗 **[View Live Application](https://project-lbwa.onrender.com/listings)**

---

## 📌 Project Overview

**WanderLust** is a full-stack hotel and accommodation booking platform that allows users to browse property listings, apply search filters, and manage reservations end-to-end. The platform features a secure authentication system, role-based access control, and a clean, responsive UI — built as a complete production-ready MVP.

---

## ✨ Features

- 🏠 **Property Listings** — Browse accommodations with detailed descriptions, photos, and pricing
- 🔍 **Search & Filters** — Filter properties by location, price range, and availability
- 📅 **Reservation Management** — Book, view, and manage property reservations
- 🔐 **JWT Authentication** — Secure sign-up and login with bcrypt password hashing
- 🛡️ **Role-Based Access Control** — Owner vs Guest permissions enforced server-side
- 🚦 **Custom Middleware** — Request validation, centralized error handling, and rate limiting
- 📦 **Redux State Management** — Predictable global state across the entire booking flow
- 📱 **Responsive Design** — Fully functional across desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Framework |
| Redux | Global State Management |
| React Router DOM | Client-side Routing |
| HTML5 / CSS3 | Structure & Styling |
| Axios | HTTP Requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | Server & REST API |
| JWT | Authentication Tokens |
| Bcrypt | Password Hashing |
| Custom Middleware | Validation & Error Handling |

### Database & Deployment
| Technology | Purpose |
|---|---|
| MongoDB | NoSQL Database |
| Mongoose | ODM for MongoDB |
| Render | Full-stack Deployment |

---

## 🏗️ Project Structure

```
WanderLust/
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── pages/            # Application Pages
│   │   ├── redux/            # Redux Store, Actions, Reducers
│   │   └── utils/            # Helper Functions & Axios Config
│   └── public/
│
└── server/                   # Node.js + Express Backend
    ├── controllers/          # Route Handler Logic
    ├── middlewares/          # Auth, Validation, Error Handling
    ├── models/               # Mongoose Data Models
    ├── routes/               # API Route Definitions
    └── server.js             # Express App Entry Point
```

---

## 🔄 Request Flow

```
User Action (React + Redux)
        ↓
Axios Request + JWT Bearer Token
        ↓
Express Server
        ↓
Auth Middleware → Validates JWT Token
        ↓
Role Check Middleware → Owner / Guest
        ↓
Controller → MongoDB via Mongoose
        ↓
JSON Response → Redux Store → UI Update
```

---

## 🔐 Authentication Flow

```
User Registers
      ↓
Password hashed with bcrypt
      ↓
User saved to MongoDB
      ↓
JWT token generated & returned
      ↓
Frontend stores token
      ↓
Every protected request sends Bearer Token
      ↓
Server validates → grants or denies access
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB account (Atlas or local)

### 1. Clone the Repository
```bash
git clone https://github.com/Akkkshat03/Project.git
cd Project
```

### 2. Setup Backend
```bash
cd server
npm install
```
Add your `.env` file with the variables above.

### 3. Setup Frontend
```bash
cd ../client
npm install
```

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd server
npm start
```

**Terminal 2 — Frontend:**
```bash
cd client
npm run dev
```

### 5. Open in Browser
```
http://localhost:5173
```

---

## 🚀 Deployment

The application is deployed on **Render** as a full-stack service:

- **Frontend** → React build served as static files
- **Backend** → Node.js/Express web service
- **Database** → MongoDB Atlas (cloud)

---

## 🎓 Key Learnings

- Building a complete full-stack application with MERN stack
- Implementing secure JWT authentication with role-based access
- Designing reusable Express.js middleware for validation and error handling
- Managing complex application state with Redux
- Deploying a full-stack MERN application to production on Render

---

## 👨‍💻 Developer

**Akshat Kumar Gupta**
MCA Student | Full-Stack Developer
📧 [work.akshat3003@gmail.com](mailto:work.akshat3003@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/akshat-gupta)
🐙 [GitHub](https://github.com/Akkkshat03)

---

