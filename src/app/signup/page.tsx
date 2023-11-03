"use client";

import loginstyle from '@/app/style/login.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Signup(){
    const router = useRouter();
    const [signup , setSignup] = useState("Signup")
    const [ user , setUser] = React.useState({
        name:"",
        email:'',
        password:'',
        cpassword:''
    })

    const SignupUser = async () =>{
     try{
      setSignup("Signing...");
      const response = await axios.post("/api/users/signup",user);
      // console.log("Signup Success" , response.data);
      setSignup("Signup");
        router.push("/login");
     }
     catch(error){
        alert("Signup Failed")
        setSignup("Signup");
        console.log(error);
     }
    }


    const isLogin = async ()=>{
        try{
          const log = await axios("/api/users/me");
          router.push("/");
        }
        catch(error){ 
        }
      }
      useEffect(()=>{
         isLogin();
      },[]);
    return(
        <div>
             <div className={loginstyle.main_div}>
                <h2>Signup</h2>
                <label htmlFor="">Name</label><br />
            <input type="text" 
            id='name'
            value={user.name}
            onChange={(e)=> setUser({...user , name:e.target.value})}
            placeholder="Enter Name" required/>
           <br /> <br />
           <label htmlFor="">Email</label><br />
            <input type="email"
            id='email'
            value={user.email}
            onChange={(e)=> setUser({...user , email:e.target.value})} 
            placeholder="enter email" required/> <br /><br />
            
            <br /> 
           <label htmlFor="">Password</label><br />
            <input type="password"
            id='password'
            value={user.password}
            onChange={(e)=> setUser({...user , password:e.target.value})}
            placeholder="Create password" required/> <br /><br />
            <br /> 
           <label htmlFor="">Confirm Password</label><br />
            <input type="password" 
              id='cpassword'
              value={user.cpassword}
              onChange={(e)=> setUser({...user , cpassword:e.target.value})}
            placeholder="confirm password" required/> <br /><br />
            <button onClick={SignupUser}>{signup}</button> <br /><br />
            Already have account <Link href="/login">Login</Link><br />
        </div>
        </div>
    )
}