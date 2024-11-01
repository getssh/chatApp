import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import connectMongoDB from './db/connectDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on ${PORT}`)
})