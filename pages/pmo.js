import Head from "next/head";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";
import { async } from "@firebase/util";
import { Data } from "../json/data";

const Pmo = () => {

  const [llist,setllist]=useState([])

const [category,setcategory]=useState([]);
const de=[]

const [appState, setAppState] = useAppContext();
const router = useRouter()
useEffect(async()=>{
    const codelist = collection(db, 'pmo');
    const codesnapshot = await getDocs(codelist);
    const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push({src:doc.data().doc,id:doc.data().code});   }):de
    setllist(de)
    return catolist
   },[])
const handelrouter=(e,path)=>{
        e.preventDefault() 
        router.push(`project/${path}`)
    }
   


    return ( 
        <div className=" bg-ligt">
            <div className="">
            <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <title>المعالم</title>
   <link rel="icon" href="" type="image/x-icon" />
            </Head>
   
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
    crossOrigin="anonymous">
       
    </script>
    <div className="  w-100 ">
    <table className="table table-striped mt-5">
  <thead>
    <tr>
      <th scope="col">رقم التعميد</th>
      <th scope="col">اسم المشروع</th>
            <th scope="col">تنزيل الملف</th>
    </tr>
  </thead>
  <tbody>
    {
      llist.map(x=>
        <tr key={x.id}>
      <th scope="row">{Data.a.find(p=>p.path==x.id).id}</th>
      <td>{Data.a.find(p=>p.path==x.id).project}</td>
      <td><a href={x.src} download="filename">تنزيل الملف</a></td>
    </tr>
      )
    }
    
  </tbody>
</table>
      </div>
     
    </div>
    </div>
     );
}
 
export default Pmo;
