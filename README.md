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




🔧 Tech Stack
Frontend:

⚛️ React + Vite

🎨 TailwindCSS + Framer Motion

📦 React Router

🍞 React Hot Toast

Backend:

🧠 OpenAI (AI session generation)

🛠 Node.js + Express

💾 MongoDB + Mongoose

🔐 JWT for Auth

📁 Multer for file upload

✨ Features
🧠 AI Interview Sessions – Auto-generate questions using OpenAI.

📋 Role-based Practice – Choose a role, experience, and focus areas.

🧑‍💼 User Auth – Signup/login with secure JWT tokens.

📈 Dashboard – View, delete, and revisit past sessions.

🎨 Responsive UI – Built with TailwindCSS & animated with Framer Motion.

☁️ Backend APIs – Organized routes and modular controllers.

🛠 Getting Started
🔐 Setup .env
Backend .env example:

`PORT=5000
MONGODB_URI=mongodb://localhost:27017/upskillme
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
`


🚀 Start Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
💻 Start Frontend
bash
Copy
Edit
cd Frontend
npm install
npm run dev



🧪 Folder Highlights
components/Loader/ – Spinner & Skeleton Loaders

pages/Home/Dashboard.jsx – Main session overview

pages/InterviewPrep/ – AI responses & header

backend/controllers/aiController.js – OpenAI logic

backend/utils/prompts.js – AI prompt templates

📌 To Do / Coming Soon
🤖 AI chatbot interface

📊 Progress tracking

📁 Export sessions

🌍 Deployment (Render / Vercel / Netlify)

🤝 Contributing
Want to help? Fork it, create a branch, and submit a PR!

📄 License
© 2025 UpskillMe AI

