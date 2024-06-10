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
import { Pmos } from "../json/pmos";
import Link from "next/link";
import Accordion from "../layout/accorduon";

const Pmo = () => {

  
  const [llist,setllist]=useState(Data.b)

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
   
const cvc =(x)=>{
 let c= llist.find(v=>v.ID==x)
 console.log(c)
 return(c.project?c.project:"")
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
    <nav className="navbar navbar-light ">
  <div className="container">
  
<Link className="mt-5" href={`/`}>
    <a className="navbar-brand mt-5" href="/">
      <img src="https://firebasestorage.googleapis.com/v0/b/arch-86ad1.appspot.com/o/Heritage_Commission_Logo.png?alt=media&token=e8625464-8bc6-4564-a56d-401f62e9ff44"alt="" width="300" height="70" className="d-inline-block align-text-top"/>
    </a>
    </Link>

  </div>
</nav>
<h4 className=" mt-2 me-5 ha1 p-2 text-light box text-end"> لوحة معالم المشاريع </h4>
<a className="p-2 ha2 rounded pt-2 text-light ms-5" target="_blank" href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Farch-86ad1.appspot.com%2Fo%2F%25D8%25A5%25D8%25AF%25D8%25A7%25D8%25B1%25D8%25A9%2520%25D9%2585%25D8%25B1%25D9%2583%25D8%25B2%2520%25D8%25A7%25D9%2584%25D9%2585%25D8%25B4%25D8%25A7%25D8%25B1%25D9%258A%25D8%25B9%2520%25D8%25A7%25D9%2584%25D8%25AA%25D8%25B1%25D8%25A7%25D8%25AB%25D9%258A%25D8%25A9%2520-%2520%25D9%2585%25D8%25B4%25D8%25A7%25D8%25B1%25D9%258A%25D8%25B9%2520%25D9%2585%25D9%2583%25D8%25AA%25D9%2585%25D9%2584%25D8%25A9%2520%25D9%2588%25D9%2585%25D8%25B7%25D9%2584%25D9%2588%25D8%25A8%2520%25D8%25A7%25D9%2584%25D8%25AA%25D8%25AD%25D8%25AF%25D9%258A%25D8%25AB%2520%25D8%25B9%25D9%2584%25D9%258A%25D9%2587%25D8%25A7.xlsx%3Falt%3Dmedia%26token%3D41ca886c-adbe-493a-ad30-a637843ea3de&wdOrigin=BROWSELINK">تنزيل الملف</a>

    <div className=" mt-2  w-100 rounded ">
      {
        Pmos.map(x=><Accordion  data={{title:x[0].project,content:x}}/>)
      }
      

   

      </div>
     
    </div>
    </div>
     );
}
 
export default Pmo;
