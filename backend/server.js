import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectMongoDB from './db/connectDB.js';
import userRoutes from './routes/user.routes.js'

dotenv.config();
const PORT = 3000;
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on ${PORT}`)
})