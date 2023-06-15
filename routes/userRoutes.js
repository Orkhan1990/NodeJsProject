import  express  from "express";
import Session from '../models/session.js';
import crypto from 'crypto';
import User from '../models/user.js';
import multer from 'multer';




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
  })


  const upload = multer({ storage: storage })


const SALT='12345';
const router=express.Router();


router.get('/api/v1/users',async(req,res)=>{
    const users=await User.find();
         res.status(200).send(users);
})

router.get('/api/v1/users/:id',async(req,res)=>{

    const user= await User.findById(req.params.id);
    res.status(200).send(user); 
})
router.post('/api/v1/register',upload.single('image'),async(req,res)=>{
      console.log(req.file);
   const {path}=req.file;
    const newUser=new User({...req.body,image:path});
    await newUser.save();
    res.status(201).send('Created'); 
})
router.put('/api/v1/users/:id',async(req,res)=>{
       await User.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send();
})

router.delete('/api/v1/users/:id',async(req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send();
})

router.post('/api/v1/login',async(req,res)=>{
     console.log(req.body);
    const{email,password}=req.body;
    const user= await User.findOne({email:email,password:crypto.pbkdf2Sync(password,
        'salt', 2000, 64, 'sha512').toString('hex')});
        if(user){
            const token=crypto.randomBytes(64).toString('base64');
            const newSession=new Session({
                accessToken:token,
                accessUser:user._id
            });
            await newSession.save();
            res.status(201).send('Authorized!')
        }else{
            res.status(401).send({
                message:'Unauthorized!'
            })
        }
    
})


export default router;
