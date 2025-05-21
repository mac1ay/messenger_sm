const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
connectDB();
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});