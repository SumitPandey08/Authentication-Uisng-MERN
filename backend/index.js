import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
