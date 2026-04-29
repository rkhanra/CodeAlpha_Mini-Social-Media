This is a simple social media app with some basic features like User Profiles, Posts and Comments , Like / Follow and Follow / Unfollow system
Frontend : HTML , CSS , JAVASCRIPT
Backend : Express JS
Database for Users , Posts , Comments 



PROJECT STRUCTURE

mini-social-app/
│
├── server/
│   ├── server.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── postRoutes.js
│   │
│   └── config/db.js
│
├── client/
│   ├── index.html
│   ├── profile.html
│   ├── style.css
│   ├── script.js
│
└── package.json





TO start this project in your local machine follow these steps
1. Install dependencies

npm init -y
npm install express mongoose cors body-parser
npm install bcryptjs jsonwebtoken

Run Backend Database
2. Start MongoDB
mongod
3. Run Backend
node server.js
4. Open Frontend
use live server
client/index.html




How MongoDB Works

When your code uses:
mongoose.connect('mongodb://127.0.0.1:27017/social_app');
This means:

Database name = social_app
If it doesn’t exist → MongoDB creates it automatically
First insert → collections (users, posts, etc.) are created

5. Verify in Compass
Open Compass → you’ll now see:

social_app
 ├── users
 ├── posts
 ├── comments

(This ensures that database is connected successfully)