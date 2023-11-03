"use client";
import axios from "axios"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Router from "next/router";

export default function Logout(){
    const router = useRouter();
    const logout = async ()=>{
        try{
            await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch(error){
          console.log(error);
        } 
    }
    useEffect(()=>{
    logout();
    },[])
    return(
        <div>
            <h1>Logout page</h1>
        </div>
    )
}