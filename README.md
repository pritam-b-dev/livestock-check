![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Express](https://img.shields.io/badge/Express.js-5-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)

# 🐄 LiveStock-Check

A modern full-stack livestock inventory management platform built with **Next.js 15**, **Express.js**, **MongoDB**, and **Better Auth**.

LiveStock-Check helps farmers and organizations manage livestock inventory efficiently with secure authentication, role-based access, analytics, and premium subscription support.

---

## 🌐 Live Demo

### Frontend

https://livestock-check.vercel.app/

### Backend API

https://livestock-check-server.vercel.app/

---

# ✨ Features

## 🔐 Authentication

- Email & Password Authentication
- Google OAuth Login
- JWT Authentication
- Better Auth Integration
- Protected Routes
- Role Based Authorization

---

## 👤 User Features

- Add livestock inventory
- Update inventory
- Delete inventory
- Manage own items
- Low stock warning
- Premium subscription support
- Personal dashboard

---

## 👑 Admin Features

- Dedicated Admin Dashboard
- View platform analytics
- Total Users
- Total Inventory
- Inventory Value
- Low Stock Reports
- Category Analytics (Recharts)
- Inventory Trend Analytics
- Manage all users' inventory

---

## 📊 Analytics

- Category Distribution Chart
- Inventory Trend Chart
- Total Users
- Total Items
- Total Inventory Value
- Low Stock Alert

---

## 💳 Subscription

- Stripe Payment Integration
- Premium Membership
- Free & Premium Plan Support

---

## 🎨 UI Features

- Responsive Design
- Dark Mode
- Modern Dashboard
- Skeleton Loading
- Toast Notifications
- Beautiful Animations

---

# 🛠 Tech Stack

## Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Better Auth Client
- Lucide Icons
- Sonner

---

## Backend

- Express.js
- MongoDB
- Better Auth
- JWT
- Stripe
- JOSE

---

## Deployment

- Frontend → Vercel
- Backend → Vercel
- Database → MongoDB Atlas

---

# 🔑 Demo Accounts

## 👤 User

Email

```text
demo@livestockcheck.com
```

Password

```text
Demo@1234
```

---

## 👑 Admin

Email

```text
admin@livestockcheck.com
```

Password

```text
Admin@1234
```

---

# 📁 Project Structure

```
client/
│
├── app/
├── components/
├── lib/
├── hooks/
└── public/

server/
│
├── routes/
├── middleware/
├── lib/
└── index.ts
```

---

# ⚙️ Environment Variables

## Client

```env
NEXT_PUBLIC_SERVER_URL=
```

---

## Server

```env
CLIENT_URL=
BETTER_AUTH_URL=

MONGODB_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

---

# 🚀 Installation

## Clone

```bash
git clone https://github.com/your-username/livestock-check.git
```

---

## Install

Client

```bash
npm install
```

Server

```bash
npm install
```

---

## Run

Client

```bash
npm run dev
```

Server

```bash
npm run dev
```

---

# 📸 Screenshots

> Add project screenshots here after deployment.

---

# 👨‍💻 Author

**Your Name**

GitHub:
https://github.com/yourusername

LinkedIn:
https://linkedin.com/in/yourprofile

---

# 📄 License

This project is licensed under the MIT License.
