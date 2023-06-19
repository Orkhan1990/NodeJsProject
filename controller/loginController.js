
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


const loginController= async(req,res)=>{
   
        console.log(req.body);
       const{email,password}=req.body;
       const user= await User.findOne({email:email,password:crypto.pbkdf2Sync(password,
           'salt', 2000, 64, 'sha512').toString('hex')});
           if(user){
   

            const {passsword,...rest}=user;
            const token=jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: rest
              }, process.env.JWT_SECRET_KEY,"shhhhh");
               res.status(201).send(token)
           }else{
               res.status(401).send({
                   message:'Unauthorized!'
               })
           }
}



export default loginController;