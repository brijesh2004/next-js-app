"use client";
import loginstyle from '@/app/style/login.module.css'; 
import profileStyle from '@/app/style/profile.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '../loading';
export default function Papers(){

    const router = useRouter();
    const [paper , setPeper]:any = useState("");
    const [title , setTitle]:any = useState("");
    const [upload , setUpload] = useState("Upload");
    const [allpaperslink , setPaperLink]:any[] = useState([]);
    const [paperloaded , setPaperloaded] = useState(false);

    const handlePapers = (e:any)=>{
     let reader = new FileReader();
     reader.onload = function(){
        setPeper(reader.result);
     }
     reader.readAsDataURL(e.target.files[0]);
    };

    const uploadPaper = async () =>{
        try{
            // const papers = {title , paper};
            setUpload("Uploading...");
             const upload = await axios.post("/api/users/me",{title , paper});
            //  console.log(upload);
             setUpload("Upload");
            alert("paper uploaded successfully")

        }
        catch(error){
            alert("Paper not uploaded due to some region");
            setUpload("Upload");
            console.log(error);
        }
    }



    const findallPapers = async () =>{
        try{
            setPaperloaded(true);
            const allPapers:any = await axios.get("/api/users/findPapers");
            setPaperLink(allPapers.data.data);
            // console.log(allPapers.data.data);
            setPaperloaded(false);
            // console.log("all papers link" + allpaperslink)
        }
        catch(error){
            console.log("error" + error);
        }
        
    }

  const isLogin = async ()=>{
    try{
      const log = await axios("/api/users/me");
      
    }
    catch(error){
      router.push("/login");
    }
    

  }
  useEffect(()=>{
     isLogin();
  },[]);

    useEffect(()=>{
        findallPapers();
    },[]);
    return(
        <div>
          <button className={profileStyle.btn} onClick={():any=>{
        router.push("/")
      }}>
        Back
      </button>
             <div className={loginstyle.main_div}>
                <h2>Upload Papers</h2>
                <input type="text" 
                name='title'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                 placeholder="Enter the paper title"/> <br /><br /><br />
               
                <input type="file"
                 accept='.pdf'
                 name="paper"
                 onChange={handlePapers}
                 /><br /><br />
                <button className={loginstyle.btn} onClick={uploadPaper}>{upload}</button> 
             </div>


         {paperloaded&&<Loading/>}
         <div className={profileStyle.profile}>

              {
                Array.isArray(allpaperslink)&&allpaperslink.map((elem:any ,index:number)=>{
                  return(
                    <div key={elem._id}>
                       {/* <h2> Subject name :  {elem.title}</h2> */}
                       <h2 className={profileStyle.table}>Subject name :  {elem.title}   <span> <a href={elem.paperlink} download={`${elem.title}.pdf`}> Download</a></span></h2>
                    </div>
                  )
                })
              }

        </div>
        </div>
    )
}