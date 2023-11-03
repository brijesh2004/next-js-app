"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import loginstyle from '@/app/style/login.module.css';
import { useRouter } from "next/navigation";
import profileStyle from '@/app/style/profile.module.css';
import Loading from "../loading";
export default function Notes() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [notes, setNotes]: any = useState("");
  const [upload, setUpload] = useState("Upload");
  const [allnoteslink, setNotesLink]: any[] = useState([]);
  const [notesuploaded, setNotesuploaded] = useState(false);
  const isLogin = async () => {
    try {
      const log = await axios("/api/users/me");
    }
    catch (error) {
      router.push('/login');
    }
  }
  const HandleNotes = (e: any) => {
    let reader = new FileReader();
    reader.onload = function () {
      setNotes(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const uploadNotes = async () => {
    try {
      // const papers = {title , paper};
      setUpload("Uploading...");
      const upload = await axios.post("/api/users/uploadNotes", { title, notes });
      //  console.log(upload);
      setUpload("Upload");
      alert("paper uploaded successfully")

    }
    catch (error) {
      setUpload("Upload");
      alert("Paper not uploaded due to some region");
      console.log(error);
    }
  }

  const findallNotes = async () => {
    try {
      setNotesuploaded(true);
      const allPapers: any = await axios.get("/api/users/findNotes");
      setNotesLink(allPapers.data.data);
      // console.log(allPapers.data.data);
      setNotesuploaded(false);
      // console.log("all papers link" + allnoteslink)
    }
    catch (error) {
      console.log("error" + error);
    }

  }

  useEffect(() => {
    isLogin();
  }, []);
  useEffect(() => {
    findallNotes();
  }, []);

  return (
    <div>
      <button onClick={():any=>{
        router.push("/")
      }}>
        Back
      </button>
      <div className={loginstyle.main_div}>
        <h2>Upload Notes</h2>
        <input type="text"
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the paper title" /> <br /><br /><br />

        <input type="file"
          accept='.pdf'
          name="paper"
          onChange={HandleNotes}
        /><br /><br />
        <button onClick={uploadNotes}>{upload}</button>
      </div>



      {notesuploaded && <Loading />}
      <div className={profileStyle.profile}>
        {
          Array.isArray(allnoteslink) && allnoteslink.map((elem: any) => {
            return (
              <div key={elem._id}>
                {/* <h2> Subject name :  {elem.title}</h2>
                <embed className={profileStyle.pdf_widht_height} src={elem.notelink} type="application/pdf"/> */}
                {/* <iframe src={elem.notelink}  ></iframe> */}
                <h2 className={profileStyle.table}> Subject Name : {elem.title} <span> <a href={elem.notelink} download={`${elem.title}.pdf`}> Download</a> </span> </h2>
              </div>
            )
          })
        }

      </div>

    </div>
  )
}