import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:{
        type:String,
        required:[true , 'please provide the name name']
     },
     email:{
        type:String,
        required:[true , "please provide the email"],
        unique:true
     },
     password:{
        type:String,
        required:[true ,"please provide the password"]
     },
     cpassword:{
        type:String,
        required:[true,"please provide the confirm password"]
     },
     Notes:[{
         title:{
            type:String,
         },
         notelink:{
            type:String
         },
         like:{
            type:Number,
            default:0
         }
     }],
     papers:[{
        title:{
            type:String,
        },
        paperlink:{
            type:String,
        },
        like:{
         type:Number,
         default:0
        }
     }],
     verifyToken:String,
     verifyTokenExpiry:Date,
})


const User = mongoose.models.User || mongoose.model("User" , userSchema);

export default User;
