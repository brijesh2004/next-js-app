"use client";
import navstyle from '@/app/style/navbar.module.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Navbar() {

 const[login, setLogin] = useState(false);
  const isLogin = async ()=>{
    try{
      const log = await axios("/api/users/me");
      if(log){
        setLogin(true);
      }
      else{
        setLogin(false);
      }
    }
    catch(error){
     setLogin(false)
    }
    

  }
  useEffect(()=>{
     isLogin();
  },[]);

  return (
    <div className={navstyle.home_page}>
      <nav className={ navstyle.navbar }>
        <ul className={navstyle.navbar_ul}>
         {/* {login&& <li><Link href="/"  className={navstyle.nav_link}>Home</Link></li>} */}
        { login&&    <li><Link href="/notes" className={navstyle.nav_link}>Notes</Link></li>}
        {  login&& <li><Link href="/papers" className={navstyle.nav_link}>Papers</Link></li>}

          {!login&& 
           <li><Link href="/login" className={navstyle.nav_link}>Login</Link></li>}
          {!login&&<li><Link href="/signup" className={navstyle.nav_link}>Signup</Link></li>
}
        { login&& <li><Link href="/logout" className={navstyle.nav_link}>Logout</Link></li>}
        { login&& <li><Link href="/profile" className={navstyle.nav_link}>Profile</Link></li>}
        </ul>
      </nav>
    </div>
  )
}
