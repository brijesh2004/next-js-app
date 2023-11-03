import {connect} from '@/dbConfig/dbConfig';

import User from '@/models/userModels';
import { NextRequest , NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request:NextRequest) {
    try{
     const reqBody = await request.json();
     const {name , email , password, cpassword} = reqBody;
    //  console.log("reqbody"+reqBody);
    //  console.log(name, email,password,cpassword);

     // check if user already exists
     const user = await User.findOne({email});
     if(user){
        return NextResponse.json({error:"User already exists"},{status:400});
     }
    //  console.log("user")

     // hash the password 
    //   const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password , 10);
      const hashcPassword = await bcryptjs.hash(cpassword , 10);
      // console.log("hashed")
      const newUser = new User({
        name,
        email,
        password:hashPassword,
        cpassword:hashcPassword
      })
      // console.log("created")
      const savedUser = await newUser.save();
      // console.log(savedUser);
      // console.log("saved")

      return NextResponse.json({
        message:'User Created SuccessFully',
        success:true,
        savedUser
      })
    }
    catch(error:any){
        return NextResponse.json({error:error.message}, {status:500})
    }
}
