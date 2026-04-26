const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/userRoutes'));
app.use('/posts', require('./routes/postRoutes'));

app.listen(5000, () => console.log("Server running on port 5000"));