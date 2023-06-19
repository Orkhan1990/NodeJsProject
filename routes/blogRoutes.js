import  express  from "express";
import Blog from '../models/blog.js';
import authToken from '../middlewares/accessToken.js';


const router=express.Router();


router.use(authToken);

// router.use(async(req,res,next)=>{
//     const token=req.headers||req.body||req.query;
   
//     if(token){
//         const currentSession=await Session.findOne({
//             accessToken:token.token
//         }).populate('accessUser').exec();
//         console.log(currentSession);
//         if(currentSession.exiredDate.getTime()<Date.now()){
//             res.send({
//                 message:'Your session is expired,please login again!'
//             })
//         }else{
//             req.user=currentSession.accessUser;
//             next();
//         }

//     }else{
//         res.status(401).send({
//             message:"Unauthorized user!"
//         })
//     }
   
        
// })

router.get('/api/v1/blogs',async(req,res)=>{
         const blogs=await Blog.find();
         res.status(200).send(blogs);
})

router.get('/api/v1/blogs/:id',async(req,res)=>{
     const blog=await Blog.findById(req.params.id);
     res.status(200).send(blog);
})
router.post('/api/v1/blogs',async(req,res)=>{
    const newBlog=new Blog(
        {
            ...req.body,
            author:req.user._id 
        }
        );
    await newBlog.save();
    res.status(201).send('Created!')
})
router.put('/api/v1/blogs/:id',async(req,res)=>{
    const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).send('Updated')
})

router.delete('/api/v1/blogs/:id',async(req,res)=>{
        await Blog.findByIdAndDelete(req.params.id); 
        res.status(200).send("Deleted");
})


export default router;