# 🚀 UpskillMe AI – AI-Powered Interview Preparation Platform

UpskillMe AI is a full-stack modern web app to help users prepare for job interviews using AI. Built with ❤️ using React, Node.js, MongoDB, and Gemini.

---

## 📁 Project Structure

UPSKILLME-AI
├── backend/            → Node.js + Express server
│   ├── config/         → DB config

│   ├── controllers/    → API logic (AI, auth, session, question)

│   ├── middlewares/    → Auth & file upload middleware

│   ├── models/         → Mongoose models (User, Session, Question)

│   ├── routes/         → Express routes

│   ├── uploads/        → File uploads folder

│   ├── utils/          → Prompt templates etc.

│   ├── server.js       → Entry point for backend
│
├── Frontend/           → React frontend

│   ├── public/         → Static HTML and assets

│   ├── src/

│   │   ├── assets/     → Images and logos
│   │   ├── components/ → UI components
│   │   │   ├── Cards/
│   │   │   ├── Inputs/
│   │   │   ├── layouts/
│   │   │   ├── Loader/
│   │   │   ├── Drawer.jsx, Modal.jsx

│   │   ├── context/    → Global user context

│   │   ├── pages/      → Page components

│   │   │   ├── Auth/   → Login/Signup
│   │   │   ├── Home/   → Dashboard & session form
│   │   │   ├── InterviewPrep/ → AI response & questions

│   │   ├── utils/      → API paths, axios config

│   │   ├── App.jsx     → Main App component
│   │   ├── index.jsx   → ReactDOM render
│
├── .env                → Environment variables
├── package.json        → Project dependencies
├── README.md           → You’re reading this 😉





---

## 🔧 Tech Stack

### 🖥 Frontend:
- ⚛️ React + Vite
- 🎨 TailwindCSS
- 🧩 Framer Motion (for smooth animations)
- 🍞 React Hot Toast (notifications)
- 🔀 React Router DOM

### 🧠 Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- OpenAI API (for AI-generated interview questions)
- Multer (for image uploads)

---

## ✨ Features

- 🧠 **AI Interview Sessions** – Get role-based interview questions generated by OpenAI.
- 📋 **Create Sessions** – Choose your role, experience, and focus areas.
- 🗂 **Session Management** – View, delete, and explore previous sessions.
- 🔒 **Authentication** – Signup & login securely using JWT.
- ⚡ **Loading States** – Beautiful spinners & skeletons.
- 🧾 **Responsive UI** – Looks great on desktop and mobile.
- 🛠 **Modular Code** – Clean, organized, and scalable.

---

## 🛠 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/upskillme-ai.git
cd upskillme-ai


## 2️⃣ Setup Backend

cd backend
npm install
🧪 Create .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/upskillme
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key

## ▶️ Start Backend:

npm run dev
3️⃣ Setup Frontend

cd ../Frontend
npm install
npm run dev

## 🔒 Authentication Flow

✅ Signup & login with JWT

🧠 Protected routes via user context

🍪 Tokens saved locally

##🚧 Coming Soon

🤖 AI Chatbot Integration

📈 Interview Progress Tracking

📤 Export Sessions to PDF

☁️ Deployment (Render + Vercel)

##🤝 Contributing
Pull requests are welcome! Fork the repo, make changes on a feature branch, and open a PR.

🪪 License
© 2025 — UpskillMe AI Team


Let me know if you’d like me to:
- Add deploy instructions (Vercel, Render, MongoDB Atlas)?
- Add screenshots section with placeholders or image tags?
- Generate a `.env.example` file?
