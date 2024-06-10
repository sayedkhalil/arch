import Head from "next/head";
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import AuthRoute from "../authrout";
import { Data } from "../json/data";
export const getStaticProps =async()=>{
    const de=[]
    const opnionarr=[]
    const or=[]
    const pro=[]
    const infoRef = doc(db, "info", "info");
    const infoSnap = await getDoc(infoRef)
    const getinfo =  infoSnap.data()?infoSnap.data().info:{}
    const docRef = doc(db, "cover", "cover");
    const docSnap = await getDoc(docRef);
    const getcover =  docSnap.data()?docSnap.data().covers:[]
    const docRefpar = doc(db, "partn", "partn");
    const docSnapar = await getDoc(docRefpar);
    const getpartn =  docSnapar.data()?docSnapar.data().partns:[]
    const codelist = collection(db, 'category');
    const codesnapshot = await getDocs(codelist);
    const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
    const prodlist = collection(db, 'broductes');
    const prodsnapshot = await getDocs(prodlist);
    const products =async()=>await prodsnapshot.docs?prodsnapshot.docs.map(doc =>{ pro.push({code:doc.data().code,
    title:doc.data().title,category:doc.data().category,imges:doc.data().imges});   }):[]
    const ordlist = collection(db, 'orders'); 
    const ordsnapshot = await getDocs(ordlist);
    const orderget =async()=>await ordsnapshot.docs?ordsnapshot.docs.map(doc =>or.push(doc.data()))   :[]
    const opnion = collection(db, 'opnion');
    const opnionsnap = await getDocs(opnion);
    const getopnion =async()=>await opnionsnap?opnionsnap.docs.map(doc =>{opnionarr.push(doc.data());   }):[];
    products()
    getopnion()  
    orderget()
   
        return{
        props:{getdata:{data:de,products:pro,getcov:getcover,getpart:getpartn,getopn:opnionarr,getinfo:getinfo,getorder:or}}
             }
}
const Admin = ({getdata}) => {
      var par=[]
    var cov=[]
    const pro=[]
  const i =1
 const dd=[]
  const {inputRef} = useRef();
  const {inputlogo} = useRef();
  const inputcategory = useRef()
  const [imagesitem, setImagesitem] = useState([]);
  const [imagesitem1, setImagesitem1] = useState([]);
  const [imagesitem2, setImagesitem2] = useState([]);
  const [imagesitem3, setImagesitem3] = useState([]);
  const [imagesitem4, setImagesitem4] = useState([]);
  const [imagesitem5, setImagesitem5] = useState([]);
  const [llist, setllist] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressd1, setProgressd1] = useState(0);
  const [progressd2, setProgressd2] = useState(0);
  const [progressd3, setProgressd3] = useState(0);
  const [progressd4, setProgressd4] = useState(0);
  const [progressd5, setProgressd5] = useState(0);
  const [progressd6, setProgressd6] = useState(0);
  const [progresspmo, setProgresspmo] = useState(0);
  const [progresss, setProgresss] = useState(0);
  const [imagesitemm, setImagesitemm] = useState([]);
  const [progress10, setProgress10] = useState(0);
  const [logoitem, setlogoitem] = useState([getdata.getinfo.logo?getdata.getinfo.logo:""]);
  const [progresslogo, setProgresslogo] = useState(0);
  const [coveritem, setcoveritem] = useState([]);
  const [progresscover, setProgresscover] = useState(0);
  const [partnitem, setpartnitem] = useState([]);
  const [progressopn, setProgressopn] = useState(0);
  const [opnitem, setopnitem] = useState([]);
  const [progresspartn, setProgresspartn] = useState(0);
  const [product,setproduct]=useState({});
  const [jop,setjop]=useState({});
  const [news,setnews]=useState({})  ;
  const [covss,setcovss]=useState({})
  const [pmo,setpmo]=useState({})
  const [docs,setdocs]=useState({})
  const [category,setcategory]=useState(getdata.data);
  const [categoryitem,setcategoryitem]=useState();
  const [info,setinfo]=useState(getdata.getinfo?getdata.getinfo:{});
  const [opnion,setopnion]=useState({});
  const [opnions,setopnions]=useState(getdata.getopn); 
  const [partener,setparter]=useState(getdata.getpart);
  const [productes,setproductes]=useState(getdata.products);
  const [orders,setorders]=useState({});
  const [covers,setcovers]=useState(getdata.getcov);
  const [orderss,setorderss]=useState(getdata.getorder)
 
   
   // -------------------------------------------------------------------------------------------------------jop----------------
   const onjopcode = (e) => setjop({...jop,code:e.target.value})
const onjoptitle = (e) => setjop({...jop,title:e.target.value})
const onjopdes = (e) => setjop({...jop,des:e.target.value})
const onjopres = (e) => setjop({...jop,res:e.target.value})
const onjopser = (e) => setjop({...jop,ser:e.target.value})
const onjopkin = (e) => setjop({...jop,kin:e.target.value})
const onjopsec = (e) => setjop({...jop,sec:e.target.value})

      const addjop=async(e)=>{
        e.preventDefault() 
        
       const docRef = await setDoc(doc(db, "jops", jop.code), jop); 
       setproduct({title:"",code:"",des:"",res:"",sec:"",ser:"",kin:""}) 
       setImagesitem([])
           
      }
 
     //  ---------------------------------------------------------------------------------------------------add category----------------
     const ondoc = (e) => {setdocs({...docs,code:e.target.value})

    }
   
    // ---------------------------------upload image-------------------------------------------
 
      const uploadd1 = (e) => {
        const file = e.target.files[0];
        if(file){
           if(imagesitem1.length<4){            
            const storage = getStorage();
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on('state_changed', 
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressd1(progress)
                     
            }, 
            (error) => {
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setProgressd1(0);
                setdocs({...docs,doc1:downloadURL})
                            });
            }
          );}else{alert("أقصى عدد للصور 12 صور")}}
          };
          const uploadd2 = (e) => {
            const file = e.target.files[0];
            if(file){
               if(imagesitem2.length<4){            
                const storage = getStorage();
                const storageRef = ref(storage, file.name);
                const uploadTask = uploadBytesResumable(storageRef, file);
        
                uploadTask.on('state_changed', 
                (snapshot) => {
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  setProgressd2(progress)
                }, 
                (error) => {
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setProgressd2(0);
                    setdocs({...docs,doc2:downloadURL})
                    });
                }
              );}else{alert("أقصى عدد للصور 12 صور")}}
              };
              const uploadd3 = (e) => {
                const file = e.target.files[0];
                if(file){
                   if(imagesitem.length<4){            
                    const storage = getStorage();
                    const storageRef = ref(storage, file.name);
                    const uploadTask = uploadBytesResumable(storageRef, file);
            
                    uploadTask.on('state_changed', 
                    (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      setProgressd3(progress)
                    }, 
                    (error) => {
                    }, 
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setProgressd3(0);
                    
                        setdocs({...docs,doc3:downloadURL})
                        });
                    }
                  );}else{alert("أقصى عدد للصور 12 صور")}}
                  };
                  const uploadd4 = (e) => {
                    const file = e.target.files[0];
                    if(file){
                       if(imagesitem.length<4){            
                        const storage = getStorage();
                        const storageRef = ref(storage, file.name);
                        const uploadTask = uploadBytesResumable(storageRef, file);
              
                        uploadTask.on('state_changed', 
                        (snapshot) => {
                          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                          setProgressd4(progress)
                        }, 
                        (error) => {
                        }, 
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setProgressd4(0);
                            setdocs({...docs,doc4:downloadURL})
                            });
                        }
                      );}else{alert("أقصى عدد للصور 12 صور")}}
                      };
                      const uploadd5 = (e) => {
                        const file = e.target.files[0];
                        if(file){
                           if(imagesitem.length<4){            
                            const storage = getStorage();
                            const storageRef = ref(storage, file.name);
                            const uploadTask = uploadBytesResumable(storageRef, file);
                    
                            uploadTask.on('state_changed', 
                            (snapshot) => {
                              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                              setProgressd5(progress)
                            }, 
                            (error) => {
                            }, 
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                setProgressd5(0);                            
                                setdocs({...docs,doc5:downloadURL})
                                });
                            }
                          );}else{alert("أقصى عدد للصور 12 صور")}}
                          };
                          const uploadd6 = (e) => {
                            const file = e.target.files[0];
                            if(file){
                               if(imagesitem.length<4){            
                                const storage = getStorage();
                                const storageRef = ref(storage, file.name);
                                const uploadTask = uploadBytesResumable(storageRef, file);
                        
                                uploadTask.on('state_changed', 
                                (snapshot) => {
                                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                  setProgressd6(progress)
                                }, 
                                (error) => {
                                }, 
                                () => {
                                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    setProgressd6(0);
                                
                                    setdocs({...docs,doc6:downloadURL})
                                    });
                                }
                              );}else{alert("أقصى عدد للصور 12 صور")}}
                              };
                            
          const addDoc=async(e)=>{
            e.preventDefault() 
           if(docs.code){
           const docRef = await setDoc(doc(db, "docs", docs.code), docs); 
           setdocs({code:"",doc1:"",doc2:"",doc3:"",doc4:"",doc5:"",doc6:""}) 
            }else{alert("أكمل باقي الحقول")
         
          }     
          }
//   --------------------------------------------------------------------------------------------------add مشروع--------------------
const onpmocode = (e) => setpmo({...pmo,code:e.target.value})

// ---------------------------------upload image-------------------------------------------

  const uploadpmoImage = (e) => {
    const file = e.target.files[0];
    if(file){
       if(imagesitem.length<4){            
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresspmo(progress)
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgresspmo(0);
        
            setpmo({...pmo,doc:downloadURL})
            });
        }
      );}else{alert("أقصى عدد للصور  4 صور")}}
      };
      const addpmo=async(e)=>{
        e.preventDefault() 
        if(pmo.code){
       
          // const df=llist.push({name:Data.a.find(x=>x.id==pmo.code).project,id:pmo.code,src:pmo.doc})
          

          setllist([...llist,{name:Data.a.find(x=>x.id==pmo.code).project,id:pmo.code,src:pmo.doc}])
          console.log(llist)
       const docRef = await setDoc(doc(db, "pmo", pmo.code),pmo); 
      

       setpmo({code:"",doc:""}) 
        }else{alert("أكمل باقي الحقول")}     
      }
     //   -------------------------------------------------------------------------------------------------- edit info --------------------      
     const oninfoname = (e) => setinfo({...info,name:e.target.value})
     const oninfoadress = (e) => setinfo({...info,adress:e.target.value})
     const oninfodes = (e) => setinfo({...info,des:e.target.value})
     const oninfokey = (e) => setinfo({...info,key:e.target.value})
     const oninfotele = (e) => setinfo({...info,tele:e.target.value})
     const oninfomob = (e) => setinfo({...info,mob:e.target.value})
     const oninfomob2 = (e) => setinfo({...info,mob2:e.target.value})
     const oninfoemail = (e) => setinfo({...info,email:e.target.value})
     const oninfowhats = (e) => setinfo({...info,whats:e.target.value})
     const oninfoface = (e) => setinfo({...info,face:e.target.value})
     const oninfoabout = (e) => setinfo({...info,about:e.target.value})
     const oninfotwitter = (e) => setinfo({...info,twitter:e.target.value})
     const oninfoinsta = (e) => setinfo({...info,insta:e.target.value})
     const oninfolinked = (e) => setinfo({...info,linked:e.target.value})
     const oninfosnap = (e) => setinfo({...info,snap:e.target.value})
     const uploadlogo = (e) => {
        const filelogo = e.target.files[0];
        if(filelogo){
         if(imagesitem.length<1){
        const filelogo = e.target.files[0];    
        const storage = getStorage();
        const storageRef = ref(storage, filelogo.name);
        const uploadTask = uploadBytesResumable(storageRef, filelogo);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progresslogo = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresslogo(progresslogo)
          console.log('Upload is ' + progresslogo + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgresslogo(0);

            setlogoitem([downloadURL])
            setinfo({...info, logo:downloadURL})
            });
        }
      );}else{alert("أقصى عدد للصور صورة واحدة")}}
      };
      const addinfo=async(e)=>{
          if(info.logo){
          e.preventDefault()
        const docRef = await setDoc(doc(db, "info", "info"),{info:info});        
      }else("لابد من تحويل لوجو للصفحة")}
       //   -------------------------------------------------------------------------------------------------- edit cover --------------------      
       const uploadcover = (e) => {if(imagesitem.length<4){
        const filecover = e.target.files[0]; 
        if(filecover){  
        const storage = getStorage();
        const storageRef = ref(storage, filecover.name);
        const uploadTask = uploadBytesResumable(storageRef, filecover);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progresscover = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresscover(progresscover)
          console.log('Upload is ' + progresscover + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgresscover(0);

            setcoveritem([...coveritem,downloadURL])
            cov.push(downloadURL)
          
        });
        }
      );}else{alert("أقصى عدد للصور 4 صور")}
        } };
      const addcover=async()=>{
          if(coveritem){
            const docRef = await setDoc(doc(db, "cover", "cover"),{covers:cov}); 
            const docRe = doc(db, "cover", "cover");
            const docSnap = await getDoc(docRe);
            const getcover =  docSnap.data()?docSnap.data().covers:[]
          setcovers(getcover)
          setcoveritem([])}               
      }
       const delcover=async(id)=>{
       if(covers.length>1){
        alert(`هل تريد مسح الصورة`)
        const docRef = await setDoc(doc(db, "cover", "cover"),{covers:covers.filter(item => item!=id)}); 
        const docRe = doc(db, "cover", "cover");
        const docSnap = await getDoc(docRe);
        const getcover =  docSnap.data()?docSnap.data().covers:[]
      setcovers(getcover)    
       }    else{
           alert("لابد من وجودصورة غلاف واحدة على الأقل")
       }      
     }
//  ------------------------------------------------------------------------------------------------------------------------edit partner--------------------------------
const onnewcode = (e) => {setnews({...news,code:e.target.value})

}


// ---------------------------------upload image-------------------------------------------

  const uploadnewImage = (e) => {
    const file = e.target.files[0];
    if(file){
       if(imagesitem.length<15){            
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
          console.log('Upload is ' + progress + '% done');          
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setProgress(0);
        
            setImagesitem([...imagesitem,downloadURL])
            setnews({...news,imges:imagesitem})
            console.log(news)
            });
        }
      );}else{alert("أقصى عدد للصور 12 صور")}}
      };
      const addnews=async(e)=>{
        e.preventDefault() 
       if(news.imges){
       const docRef = await setDoc(doc(db, "images", news.code), {
       ...news,imges:imagesitem }); 
       setnews({code:"",imges:"",date:""}) 
       setImagesitem([])
        }else{alert("أكمل باقي الحقول")
     
      }     
      }
//   ------------------------------------------------------------------------------------------------------------------------------------add opion------------------
//  ------------------------------------------------------------------------------------------------------------------------edit partner--------------------------------
const oncovcode = (e) => {setcovss({...covss,code:e.target.value})

}


// ---------------------------------upload image-------------------------------------------

  const uploadcovImage = (e) => {
    const file = e.target.files[0];
    if(file){
       if(imagesitem.length<4){            
        const storage = getStorage();
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresscover(progresss)
        }, 
        (error) => {
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProgresscover(0);
        
            setImagesitem1([...imagesitem1,downloadURL])
            setcovss({...covss,imges:downloadURL})

            });
        }
      );}else{alert("أقصى عدد للصور 12 صور")}}
      };
      const addcov=async(e)=>{
        console.log(covss)
        e.preventDefault() 
       if(covss.code){
        console.log("covss")
        const docRef = await setDoc(doc(db, "covers", covss.code), covss); 
        }else{alert("مل باقي الحقول")
     
      }     
      }
//   ------------------------------------------------------------------------------------------------------------------------------------add opion------------------
const opntitle = (e) => setopnion({...opnion,name:e.target.value})
const opnmsg = (e) => setopnion({...opnion,msg:e.target.value})
const opnimg  = (e) => {if(imagesitem.length<1){
    const fileopn = e.target.files[0];
    if(fileopn){    
    const storage = getStorage();
    const storageRef = ref(storage, fileopn.name);
    const uploadTask = uploadBytesResumable(storageRef, fileopn);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progressopn = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgressopn(progressopn)
      console.log('Upload is ' + progressopn + '% done');          
    }, 
    (error) => {
    }, 
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProgressopn(0);

        setopnitem([downloadURL])
        setopnion({...opnion, img:downloadURL})
        });
    }
  );}else{alert("أقصى عدد للصور صورة واحدة")}
  };}
  const addopnion=async(e)=>{
      e.preventDefault()
    const opnionarr=[]
    const docRef = await setDoc(doc(db, "opnion", opnion.name),opnion);
    setopnion({name:"",msg:"",img:""})
    const opniondoc = collection(db, 'opnion');
    const opnionsnap = await getDocs(opniondoc);
    const  getopnion =opnionsnap.docs.map(doc =>doc.data())        
    setopnions(getopnion)
    setopnitem([])
    
  }
  const delopn=async(id)=>{
      if(partener.length<4){
    alert(`هل تريد مسح`)
    await deleteDoc(doc(db, "opnion", id))
    const opniondoc = collection(db, 'opnion');
    const opnionsnap = await getDocs(opniondoc);
    const  getopnion =opnionsnap.docs.map(doc =>doc.data())
    setopnions(getopnion)
     }}
  
     //------------------------------------------------------------------------------------------------------------------   


     
return ( 
  <AuthRoute>
        <div className="adm container">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
<title>مشروع الدعم الفني</title>
   <link rel="icon" href="" type="image/x-icon" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
        </Head>
<div className="row w-100">
    <h4 className="col-12 col-lg-3 title ms-auto">لوحة التحكم</h4>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">صور وتفاصيل المشروع</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">غلاف المشروع</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">المستندات التعاقدية</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contac" type="button" role="tab" aria-controls="contact" aria-selected="false">معالم المشروع</button>
  </li>
  {/* <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#conta" type="button" role="tab" aria-controls="contact" aria-selected="false">تعديل معلومات الصفحة</button>
  </li> */}

</ul>
<div className="tab-content" id="myTabContent">
   {/*----------------------------------------------------------------------------- وظيفة---------------------------------------------------------------------------------------  */}

  <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
  <form onSubmit={addnews}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <select class="form-select w-100 p-1 " aria-label="Default select example" onChange={onnewcode}>
  <option selected>مشروع</option>
  { Data.a.map(x=>  <option  value={x.path}>{x.project}</option>
) }
 
  </select>
  
</div>

<div className=" mb-3 mt-5 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع صور</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadnewImage} />
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            imagesitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>

<input type="submit" className="btn btn-success my-3" value="رفع الصور"/>
</form>
</div>
{/* .................................................................................................................................................... */}
  <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
  <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  <form onSubmit={addcov}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <select class="form-select w-100 p-1 " aria-label="Default select example" onChange={oncovcode}>
  <option selected>مشروع</option>
  { Data.a.map(x=>  <option  value={x.path}>{x.project}</option>
) }
 
  </select>
  
      <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">المشروع</span>
</div>

<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع الغلاف</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadcovImage} />
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresscover}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresscover}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            imagesitem1.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>

<input type="submit" className="btn btn-success my-3" value="رفع الغلاف"/>
</form>
  </div>
  </div>
  {/* --------------------------------------------------------------------------------------------------------------  الأقسام--------------------------------- */}
  <div className="tab-pane fade  " id="contact" role="tabpanel" aria-labelledby="contact-tab">
  <form onSubmit={addDoc}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <select class="form-select w-100 p-1 " aria-label="Default select example" onChange={ondoc}>
  <option selected>مشروع</option>
  { Data.a.map(x=>  <option  value={x.path}>{x.project}</option>
) }
 
  </select>
  
      <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">المشروع</span>
</div>

<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary"> كراسة المشروع</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd1} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd1}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd1}</div>
</div>
        
        <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary"> تسليم الموقع</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd2} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd2}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd2}</div>
</div>
        
        <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">العقد</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd3} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd3}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd3}</div>
</div>
        
        <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">أوامر التغير</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd4} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd4}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd4}</div>
</div>
        
        <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">لاستلام الابتدائي</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd5} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd5}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd5}</div>
</div>
       
        <div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">الاستلام النهائي</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadd6} />
   </div>
   
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progressd6}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progressd6}</div>
</div>
        

<input type="submit" className="btn btn-success my-3" value="رفع الصور"/>
</form>
  </div>
  {/* ----------------------------------------------------------------------------------------------المشاريع------------------------------------------------------- */}
  <div className="tab-pane fade" id="contac" role="tabpanel" aria-labelledby="contact-tab">
  <table className="table table-striped mt-5">
  <thead>
    <tr>
      <th scope="col">رقم التعميد</th>
      <th scope="col">اسم المشروع</th>
            <th scope="col">رابط المعلم</th>
    </tr>
  </thead>
  <tbody>
    {
      llist.map(x=>
        <tr key={x.id}>
      <th scope="row">{x.id}</th>
      <td>{x.name}</td>
      <td><a href={x.src}>الرابط</a></td>
    </tr>
      )
    }
    
  </tbody>
</table>
<form onSubmit={addpmo}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <select class="form-select w-100 p-1 " aria-label="Default select example" onChange={onpmocode}>
  <option selected>مشروع</option>
  { Data.a.map(x=>  <option  value={x.path}>{x.project}</option>
) }
 
  </select>
  
      <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">المشروع</span>
</div>

<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع جدول المعالم</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadpmoImage} />
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresspmo}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresspmo}</div>
</div>
       

<input type="submit" className="btn btn-success my-3" value="رفع المعالم"/>
</form>
  </div>
  {/* -------------------------------------------------------------------------------------اضافة معلومات---------------------------------------------------------------- */}
  <div className="tab-pane fade" id="conta" role="tabpanel" aria-labelledby="contact-tab">
      <form action="" onSubmit={addinfo}>
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfoname} value={info.name} placeholder={info.name?info.name:""} required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">اسم الصفحة</span>
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع الوجو</label>
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={uploadlogo}/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresslogo}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresslogo}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            logoitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
  <div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea" onChange={oninfodes}  value={info.des} placeholder={info.des?info.des:""} required></textarea>
  <span className="input-group-text bg-primary text-light">وصف الصفحة</span>
</div>
<div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea" onChange={oninfokey}  value={info.key} placeholder={info.key?info.key:""}required></textarea>
  <span className="input-group-text bg-primary text-light">الكلمات المفتاحية</span>
</div>
<div className="input-group  mb-3 w-75 ms-auto required">
  <textarea className="form-control" aria-label="With textarea"onChange={oninfoabout}value={info.about}  placeholder={info.about?info.about:""}required></textarea>
  <span className="input-group-text bg-primary text-light">لماذا نحن</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfoadress}value={info.aderss} placeholder={info.aderss?info.aderss:""}required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">العنوان</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfotele}value={info.tele} placeholder={info.tele?info.tele:""}required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم التليفون</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfomob}value={info.mob} placeholder={info.mob?info.mob:""} required/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الجوال</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfowhats}value={info.whats} placeholder={info.whats?info.whats:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الواتساب</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <input type="tel" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  onChange={oninfomob2}value={info.mob2} placeholder={info.mob2?info.mob2:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رقم  الجوال</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="email" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoemail}value={info.email} placeholder={info.email?info.email:""} />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">البريد الإلكتروني</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoface}value={info.face} placeholder={info.face?info.face:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط فيسبوك</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfotwitter} value={info.twitter} placeholder={info.twitter?info.twitter:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط تويتر</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfoinsta}value={info.insta} placeholder={info.insta?info.insta:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط انستجرام</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfosnap} value={info.snap} placeholder={info.snap?info.snap:""} />
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط سناب شات</span>
</div>
<div className="input-group input-group-lg border-success my-3 w-75 ms-auto ">
  <input type="url" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={oninfolinked} value={info.linked} placeholder={info.linked?info.linked:""}/>
  <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">رابط لينكد إن</span>
</div>
<input type="submit"  className="btn btn-success my-3" onSubmit={addinfo} value="تعديل" />

</form>
  </div>
  {/* ---------------------------------------------------------------------------------------------------------------غلاف الصفحة------------------------------------------ */}
   <div className="tab-pane fade" id="cont" role="tabpanel" aria-labelledby="contact-tab">
   <div className="row col-12 flex-row-reverse  ">
                        {
           covers.map((cover) => (
                <div className="col-12 col-lg-3 p-4  " key={cover}>
                <img className="w-100" src={cover} alt="" />
                
                <button type="button" className="btn btn-danger"onClick={(x)=>{ delcover(cover)}}>مسح الصورة</button>
            </div>
            ))}            
</div>
<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary"> رفع غلاف الموقع ---يفضل أن يكون الغلاف851 × 315</label>
   <input className="form-control form-control-lg  text-light" id="htmlFormFileLg" type="file" onChange={uploadcover}/>
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progresss}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progresss}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            coveritem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>
        <button type="button" className="btn btn-primary" onClick={addcover}>رفع غلاف الصفحة</button>
   </div>
                  {/* ---------------------------------------------------------------------------------------الأخبار---------------------------------------------------------- */}

  <div className="tab-pane fade" id="con" role="tabpanel" aria-labelledby="contact-tab">
  <form onSubmit={addnews}> 
  <div className="input-group input-group-lg border-success my-3 w-75 ms-auto required">
  <select class="form-select w-100 p-1 " aria-label="Default select example" onChange={onnewcode}>
  <option selected>مشروع</option>
  { Data.a.map(x=>  <option  value={x.id}>{x.project}</option>
) }
 
  </select>
  
      <span className="input-group-text bg-primary text-light " id="inputGroup-sizing-sm">المشروع</span>
</div>

<div className=" mb-3 w-75 ms-auto required">
<label htmlFor="htmlFormFileLg" className="form-label text-right text-primary">رفع صور</label>
   <input className="form-control form-control-lg bg-primary text-light" id="htmlFormFileLg" type="file" ref={inputRef} onChange={uploadcovImage} />
   </div>
   <div className="progress mb-3 w-75">
  <div className="progress-bar" role="progressbar" style={{width:` ${progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{progress}</div>
</div>
        <div className="photo-grid  mb-3 w-75 ms-auto">
          {
            imagesitem.map((image) => (
              <img className="col-2" src={image} alt="" key={image} />
            ))}
        </div>

<input type="submit" className="btn btn-success my-3" value="رفع الصور"/>
</form>
  </div>
</div>
</div>
</AuthRoute>
     );
}
 
export default Admin;