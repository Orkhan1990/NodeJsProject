import mongoose from "mongoose";


const sessionSchema=new mongoose.Schema({
    accessUser:{
        type:'ObjectId',
        ref:'users'
    },
    accessToken:String,
    exiredDate:{
        type:Date,
        default:Date.now()+1000*60*60*24
    },
    currentDate:{
        type:Date,
        default:Date.now()
    }
})


const sessionModel=mongoose.model('sessions',sessionSchema);

export default sessionModel;