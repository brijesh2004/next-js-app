import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function GET(request:NextRequest){
    try{
        const users = await User.find({}, { papers: 1 });
        const allPapers = users.map(user => user.papers).flat(); // Combine papers into a single array
        // console.log(allPapers);
        // console.log(users);
        return NextResponse.json({
         message:"Data Found",
         data:allPapers
        })
    }
    catch(error){
        return NextResponse.json({
            error:"Error occurs while reading the papers data",
            success:false
        },{status:400})
    }
   
}