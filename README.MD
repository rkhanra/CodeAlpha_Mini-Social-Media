📱 Mini Social Media App

A simple social media application with core features like:

👤 User Profiles
📝 Posts & Comments
❤️ Like System
➕ Follow / ❌ Unfollow Users
🚀 Tech Stack

Frontend

HTML
CSS
JavaScript

Backend

Node.js + Express.js

Database

MongoDB (with Mongoose)
📂 Project Structure
mini-social-app/
│
├── server/
│   ├── server.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │
│   └── config/
│       └── db.js
│
├── client/
│   ├── index.html
│   ├── profile.html
│   ├── style.css
│   ├── script.js
│
└── package.json
⚙️ Setup & Installation
1️⃣ Initialize Project
npm init -y
2️⃣ Install Dependencies
npm install express mongoose cors body-parser
npm install bcryptjs jsonwebtoken
🗄️ Run the Application
3️⃣ Start MongoDB

Make sure MongoDB is installed and running:

mongod
4️⃣ Start Backend Server
node server.js
5️⃣ Run Frontend

Open the frontend using Live Server:

client/index.html
🧠 How MongoDB Works in This Project
mongoose.connect('mongodb://127.0.0.1:27017/social_app');
What this means:
Database name: social_app
If the database does not exist → MongoDB creates it automatically
Collections are created on first insert:
users
posts
comments
🔍 Verify Database Connection

Open MongoDB Compass and check:

social_app
 ├── users
 ├── posts
 ├── comments

If you see these collections, your database is connected successfully ✅

📌 Features Overview
User registration & authentication (JWT)
Create, like, and comment on posts
Follow / unfollow users
View user profiles
💡 Future Improvements
Image upload support
Real-time notifications
Responsive UI enhancements
Deployment (Render / Vercel / MongoDB Atlas)