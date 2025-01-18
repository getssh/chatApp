import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {app, server} from './socket/socket.js';

import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectMongoDB from './db/connectDB.js';
import userRoutes from './routes/user.routes.js'
import path from 'path'

const __dirname = path.resolve()

dotenv.config();
const PORT = 3000;
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

server.listen(PORT, () => {
  connectMongoDB();
  console.log(`server running on ${PORT}`)
})