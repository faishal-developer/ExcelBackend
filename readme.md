# 🚌 Bus Ticket Management Backend System

A backend system for managing bus tickets with user authentication, role-based access (Admin/User), and ticket purchasing features. Built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB (Mongoose)** following a **modular architecture** and **API versioning**.

---

## 📁 Project Structure


---

## 🚀 Features

### 🔐 Authentication & Authorization
- Register, login, and logout
- Password hashing with `bcrypt`
- JWT-based authentication
- Role-based access (Admin / User)

### 🛠️ Admin Functionalities
- Add, update, delete bus records
- Manage tickets for buses (set price, time slots)

### 👤 User Functionalities
- View buses and available tickets
- Purchase tickets for specific buses and times

### ✅ Additional Highlights
- API versioning with `/api/v1`
- Global middlewares for:
  - Error handling
  - Auth validation
  - Request validation
- Clean modular folder structure for scalability

---

## 🧰 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT for authentication
- bcrypt for password hashing

---

## ⚙️ Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bus-ticket-system.git

# Navigate to project directory
cd bus-ticket-system

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run the development server
npm run dev
