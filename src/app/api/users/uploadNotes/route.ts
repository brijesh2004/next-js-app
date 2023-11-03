import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
      const userId = await getDataFromToken(request);
      const user = await User.findOne({_id:userId});
      const {title , notes} = reqBody;
    //   process.setMaxListeners(20); 
    process.setMaxListeners(20);
    const notelink = notes;
    await user.Notes.unshift({ title, notelink });
      
    // console.log("user"+ user)
    // console.log(title + paper);
    await user.save();
    
      return NextResponse.json({
        message:"Paper added Successfully",
        success:true
      })
    }
    catch(error:any){
        return NextResponse.json({error:error.message} , {status: 400});
    }
}