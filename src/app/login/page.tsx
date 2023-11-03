"use client";
import loginstyle from '@/app/style/login.module.css';
import Link from 'next/link';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';

export default function Login(){
    const router = useRouter();
    const [login , setLogin] = useState("Login");
    const [user , setUser] = React.useState({
        email:"",
        password:""
    })

    const onLogin = async () => {
        try{
         setLogin("Login...")
       const response = await axios.post("/api/users/login" , user);
       console.log("Login" ,response.data);
       setLogin("Login");
       router.push("/");
        }
        catch(error:any){
            console.log("Login failed" , error.message);
            setLogin("Login");
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
                <h2>Login</h2>
                <label htmlFor="Email">Email</label><br />
            <input type="email" 
            id='email'
            value={user.email}
            onChange={(e)=>setUser({...user , email:e.target.value})}
             placeholder="Enter email" required/>
           <br /> <br />
           <label htmlFor="password">Password</label><br />
            <input type="password" 
            id='password'
            value={user.password}
            onChange={(e)=>setUser({...user , password:e.target.value})}
            placeholder="enter password" required/> <br /><br />
            <button onClick={onLogin}>{login}</button> <br /><br />
            Create New account <Link href="/signup">Create account</Link>
        </div>

        </div>
    )
}