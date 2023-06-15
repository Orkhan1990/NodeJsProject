import mongoose from "mongoose";
import crypto from 'crypto';

const userShema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    address:{
        city:String,
        country:String
    },
    createdDate:{
        type:Date,
        default:Date.now()
    },
    image:String
})


userShema.pre('save',function(next){
    this.password=crypto.pbkdf2Sync(this.password,
        'salt', 2000, 64, 'sha512').toString('hex');
        next();
})

const userModel=mongoose.model('users',userShema);
export default userModel;