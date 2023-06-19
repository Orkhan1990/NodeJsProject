import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import blogRoute from './routes/blogRoutes.js';
import userRoute from './routes/userRoutes.js';
import sessionRouter from './routes/sessionRouter.js';
import * as dotenv from 'dotenv'
dotenv.config();
const app=express();

const CONNECTION_STRING=process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);


app.use(express.urlencoded());
app.use(express.json());
app.use('/public',express.static(path.resolve('public')));
app.use(blogRoute);
app.use(userRoute);
app.use(sessionRouter);


export default app;