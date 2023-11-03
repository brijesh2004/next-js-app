"use client";
import axios from "axios";
import profileStyle from '@/app/style/profile.module.css';
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Loading from "../loading";
import Link from "next/link";
import { table } from "console";

export default function Profile() {

  const router = useRouter();
  const [user, setUser]: any = useState({});
  const [paperdata, setPaperData]: any[] = useState([])
  const [paperloaded, setPaperloaded] = useState(false);
  const [notesdata , setNotesData]:any = useState([]);

  const getUserData = async () => {
    setPaperloaded(true);
    const userData = await axios.get("/api/users/me");
    // console.log(userData.data);
    setUser(userData.data.data);
    setPaperloaded(false);
    setPaperData(userData.data.data.papers);
    setNotesData(userData.data.data.Notes);
    // console.log("paperdata" + paperdata);
  }

  const isLogin = async () => {
    try {
      const log = await axios("/api/users/me");

    }
    catch (error) {
      router.push("/login");
    }


  }
  useEffect(() => {
    isLogin();
  }, []);


  useEffect(() => {
    getUserData();
    // console.log(user)
  }, []);

  return (
    <div className={profileStyle.profile}>
      <button onClick={():any=>{
        router.push("/")
      }}>
        Back
      </button>
      <h1>Name {user.name} </h1>
      <h2>Email {user.email}</h2>
      <h1>Paper Uploaded By You</h1>
      {
        paperloaded && <Loading />
      }
      {
        paperdata.map((elem: any, index: number) => {
          return (
            <div>
             <h2 className={profileStyle.table}>title {elem.title}   <span> <a href={elem.paperlink} download={`paper_${index}.pdf`}> Download</a></span></h2>
            </div>
          )

        }
        )
      }
     


     <h1>Notes Uploaded By You</h1>
      {
        notesdata.map((elem: any, index: number) => {
          return (
            <div>
             <h2 className={profileStyle.table}>title {elem.title}   <span> <a href={elem.notelink} download={`${elem.title}.pdf`}> Download</a></span></h2>
            </div>
          )

        }
        )
      }
     
    </div>
  )
}