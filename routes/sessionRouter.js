import express from 'express';
import Session from '../models/session.js';


const router=express.Router();




router.get('/api/v1/session',async(req,res)=>{
     const sessions=await Session.find().populate('accessUser').exec();
     res.send(sessions);
})


export default router;