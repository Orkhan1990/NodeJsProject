import Session from '../models/session.js';
import jwtToken from 'jsonwebtoken';

const authToken=(async(req,res,next)=>{
    const token=req.headers||req.body||req.query;
   
    if(token){
        const currentSession=await Session.findOne({
            accessToken:token.token
        }).populate('accessUser').exec();
        console.log(currentSession);
        if(currentSession.exiredDate.getTime()<Date.now()){
            res.send({
                message:'Your session is expired,please login again!'
            })
        }else{
            req.user=currentSession.accessUser;
            next();
        }

    }else{
        res.status(401).send({
            message:"Unauthorized user!"
        })
    }
   
        
})


export default authToken;