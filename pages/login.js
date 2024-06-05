import React, { useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router"
import Link from "next/link";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where} from "firebase/firestore";
const Login = () => {
    const [mail, setmail] = useState("");
    const [pass, setpass] = useState("");
    const [error, setError] = useState('');
    const router = useRouter("https://arch-rouge.vercel.app/")
       const handlename = (e) => {
      setmail(e.target.value);
      setError('');
    };
    const handlepass = (e) => {
        setpass(e.target.value);
        setError('');
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
    var docRef = doc(db, "user", pass);
    const infoSnap = await getDoc(docRef)
    if(infoSnap.data().email==mail){
      localStorage.setItem("uid",infoSnap.data().uid)
      router.push('/')
    }
     else{
        alert("تأكد من صحة البريد والرقم السري")
     }
    };
  
    return (
        <>
                <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
   <title>مشروع الدعم الفني</title>
   <link rel="icon" href="" type="image/x-icon" />
   <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        <meta name="google-site-verification" content="_OtuybINzdg_u7HN4n2xCk83du_TC8CdaKcPR0p-2Bg" />
        </Head>
        <nav className="navbar navbar-light ">
  <div className="container">
  
<Link className="mt-5" href={`/`}>
    <a className="navbar-brand mt-5" href="/">
      <img src="l1.png"alt="" width="300" height="70" className="d-inline-block align-text-top"/>
    </a>
    </Link>

  </div>
</nav>


      <div className="my-5 container">
        <h3 className='w-100 bg-success text-center text-light p-3'>تسجيل الدخول</h3>
        <form onSubmit={handleSubmit}className="my-5 text-center">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            autoComplete="off"
            onChange={handlename}
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            onChange={handlepass}
            name="password"
          />
          <button type="submit">Submit</button>
          <p className="form__error">{error}</p>
        </form>
        
      </div>
      </>
    );
}
 
export default Login;