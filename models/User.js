import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
        // trim 은 공백제거 여부
        // fent boi jun@gmail.com -> 
    },
    password:{
        type:String,
        maxlength:20
    },
    role:{
        type:Number,
        default:0,
        // 0 유저
        // 2 관리자
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    },
});

const User = mongoose.model('User',userSchema);

export default User;