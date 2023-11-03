import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModels';
import { NextRequest, NextResponse } from 'next/server';
connect();

export async function GET(request:NextRequest){
    try{
        const users = await User.find({}, { Notes: 1 });
        const allNotes = users.map(user => user.Notes).flat(); // Combine papers into a single array
        // console.log(allNotes);
        // console.log(users);
        return NextResponse.json({
         message:"Data Found",
         data:allNotes
        })
    }
    catch(error){
        return NextResponse.json({
            error:"Error occurs while reading the papers data",
            success:false
        },{status:400})
    }
   
}