import mongoose from 'mongoose';

const blogShema=new mongoose.Schema({
    title:String,
    author:{
        type:'ObjectId',
        ref:'users'
    },
    body:String,
    comments:[{body:String,date:Date}],
    date:{type:Date,default:Date.now},
    meta:{
        votes:Number,
        favs:Number
    }
})


const blogModel=mongoose.model('blogs',blogShema);
export default blogModel;