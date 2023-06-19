import  express  from "express";
import User from '../models/user.js';
import upload from '../middlewares/fileUpload.js';
import loginController from '../controller/loginController.js';
import registerController from '../controller/registerController.js';


const SALT=process.env.SERCRET_SALT;
const router=express.Router();


router.get('/api/v1/users',async(req,res)=>{
    const users=await User.find();
         res.status(200).send(users);
})

router.get('/api/v1/users/:id',async(req,res)=>{

    const user= await User.findById(req.params.id);
    res.status(200).send(user); 
})
router.post('/api/v1/register',upload.single('image'),registerController)
router.put('/api/v1/users/:id',async(req,res)=>{
       await User.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send();
})

router.delete('/api/v1/users/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
})

router.post('/api/v1/login',loginController);


export default router;
