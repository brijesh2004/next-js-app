import mongoose from "mongoose";

export async function connect() {
     try{
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;

    connection.on('connceted',()=>{
        console.log("MongoDB connected Successfully");
    })

    connection.on('error', (err) =>{
        console.log('MongoDB connection error. please make sure MongoDB is running'+err);
        process.exit();
    })
     }
     catch(error){
        console.log("error in connection");
        console.log(error);
     }
}