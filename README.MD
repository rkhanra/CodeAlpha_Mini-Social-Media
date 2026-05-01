📱 Mini Social Media App

A simple social media application with core features like:

👤 User Profiles
📝 Posts & Comments
❤️ Like System
➕ Follow / ❌ Unfollow Users
🚀 Features
👤 User Features
User registration & authentication (JWT)
View user profiles
Follow / unfollow users
📝 Post Features
Create posts
Like posts
Comment on posts
View posts feed
💬 Interaction Features
Like system
Comment system
Social connections (follow system)
🧰 Tech Stack
Frontend
HTML
CSS
JavaScript
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Authentication
JWT (JSON Web Token)
bcryptjs
📁 Project Structure
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
⚙️ Installation & Setup
1️⃣ Initialize Project
npm init -y
2️⃣ Install Dependencies
npm install express mongoose cors body-parser
npm install bcryptjs jsonwebtoken
3️⃣ Database Setup

Make sure MongoDB is installed and running locally:

mongod

MongoDB connection:

mongoose.connect('mongodb://127.0.0.1:27017/social_app');
4️⃣ Run Backend Server
node server.js

Server will run at:

http://localhost:5000
5️⃣ Run Frontend

Open:

client/index.html

Recommended:

Use Live Server (VS Code extension)
🗄️ Database Structure

When MongoDB connects, it creates:

social_app database
users
posts
comments

✔ Collections are created automatically on first data insert.

🧠 How MongoDB Works in This Project

MongoDB connection:

mongoose.connect('mongodb://127.0.0.1:27017/social_app');
Explanation:
Database name: social_app
If it doesn’t exist → MongoDB creates it automatically
Collections are generated when data is first inserted
🔍 Verify Database Connection

Use MongoDB Compass and check:

social_app
├── users
├── posts
├── comments

If visible → database is connected successfully ✅

💡 Future Improvements
📸 Features
Image upload support
Real-time notifications
🎨 UI/UX
Responsive design improvements
Modern UI redesign
🚀 Deployment
Deploy backend (Render / Railway)
Deploy frontend (Vercel / Netlify)
Use MongoDB Atlas (cloud database)