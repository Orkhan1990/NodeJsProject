import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import blogRoute from './routes/blogRoutes.js';
import userRoute from './routes/userRoutes.js';


const app=express();

const CONNECTION_STRING='mongodb+srv://orkhantalibli:12345@cluster0.ru1ahvu.mongodb.net/blog-app?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_STRING);


app.use(express.urlencoded());
app.use(express.json());
app.use('/public',express.static(path.resolve('public')));
app.use(blogRoute);
app.use(userRoute);


export default app;