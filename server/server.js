require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// =====================
// 🔌 DATABASE CONNECT
// =====================
connectDB();

// =====================
// 🛡️ MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// =====================
// 📦 ROUTES
// =====================
app.use('/auth', require('./routes/authRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/users', require('./routes/userRoutes'));

// =====================
// 🧪 TEST ROUTE
// =====================
app.get('/', (req, res) => {
  res.send("API Running");
});

// =====================
// 🚀 START SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});