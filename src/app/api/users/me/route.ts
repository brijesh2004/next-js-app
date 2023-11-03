import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request :NextRequest){
    try{
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password -cpassword");  // it not give the data of password if you want multiple then write with the comma seperated 
        return NextResponse.json({
           message:"Data Found",
           data: user
        });
    }
    catch(error:any){
        return NextResponse.json({error:error.message} , {status: 400});
    }
}

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
      const userId = await getDataFromToken(request);
      const user = await User.findOne({_id:userId});
      const {title , paper} = reqBody;
    //   process.setMaxListeners(20); 
    process.setMaxListeners(20);
    const paperlink = paper;
    user.papers.unshift({ title, paperlink });
      // console.log("paper added");
    // console.log("user"+ user)
    // console.log(title + paper);
    await user.save();
    //  console.log("saved");
      return NextResponse.json({
        message:"Paper added Successfully",
        success:true
      })
    }
    catch(error:any){
        return NextResponse.json({error:error.message} , {status: 400});
    }
}