# Finance Dashboard Backend

🚀 Overview
This project is a backend system for a finance dashboard that allows users to manage financial records based on roles.

It supports:
- User authentication
- Role-based access control
- Financial record management
- Dashboard analytics

---

#🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

---
## 🔐 User Roles
- Viewer → Can only view dashboard (no record access)
- Analyst → Can view records and dashboard
- Admin → Full access (create, update, delete records + users)
---
 📦 Features

1. Authentication
- Register user
- Login user
- JWT-based authentication

2. Financial Records
- Create record (Admin only)
- View records (Admin, Analyst)
- Update record (Admin only)
- Delete record (Admin only)

3. Dashboard
- Total income
- Total expense
- Net balance

---

🔑 API Endpoints

Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

Records
- POST `/api/records` (Admin)
- GET `/api/records` (Admin, Analyst)
- PUT `/api/records/:id` (Admin)
- DELETE `/api/records/:id` (Admin)

Dashboard
- GET `/api/dashboard/summary` (Admin, Analyst)
---
🌐 Live API
👉 https://project-financedb-backend.onrender.com
---
⚙️ Setup Instructions

1. Clone repo
