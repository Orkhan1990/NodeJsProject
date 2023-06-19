import User from '../models/user.js';



const registerController=async(req,res)=>{
    console.log(req.file);
    const {path}=req.file;
     const newUser=new User({...req.body,image:path});
     await newUser.save();
     res.status(201).send('Created'); 
}


export default registerController;