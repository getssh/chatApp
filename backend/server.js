import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectMongoDB from './db/connectDB.js';

dotenv.config();
const PORT = 5000;
const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on ${PORT}`)
})