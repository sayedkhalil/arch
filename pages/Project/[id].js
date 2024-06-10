import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import { Data } from "../../json/data";
import AuthRoute from "../../authrout";
const project = ({item}) => {
 const a=JSON.parse(item)
 console.log(a)
 const b =Data.b.find(x=>x.ID==a.id)
 const c =Data.c.find(x=>x.ID==a.id)
 const d =Data.d.find(x=>x.ID==a.id)  
 const[bg_case,setbg_case]=useState("bg-secondary")
const[bgs1,setbgs1]=useState("bg-secondary")
const[bgs2,setbgs2]=useState("bg-secondary")
const[bgs3,setbgs3]=useState("bg-secondary")
const[bgs4,setbgs4]=useState("bg-secondary")
const[bgs5,setbgs5]=useState("bg-secondary")
const[bgs6,setbgs6]=useState("bg-secondary")
const[texts1,settexts1]=useState("text-light")
const[texts2,settexts2]=useState("text-light")
const[texts3,settexts3]=useState("text-light")
const[texts4,settexts4]=useState("text-light")
const[texts5,settexts5]=useState("text-light")
const[texts6,settexts6]=useState("text-light")
const[show,setshow]=useState("")
const onshow =()=>  show==""?setshow("show"):setshow("")
const vv =()=>{
  if(a.docs.doc1){setbgs1("ha2");
settexts1("text-dark")}
if(a.docs.doc2){setbgs2("ha2");
settexts2("text-dark")}
if(a.docs.doc3){setbgs3("ha2");
settexts3("text-dark")}
if(a.docs.doc4){setbgs4("ha2");
settexts4("text-dark")}
if(a.docs.doc5){setbgs5("ha2");
settexts5("text-dark")}
if(a.docs.doc6){setbgs6("ha2");
settexts6("text-dark")}
if(b.case=="متأخر"){setbg_case("ha6");
}else if(b.case=="تأخر جزئي"){
 setbg_case("ha4")
}else if(b.case=="على المسار"){
  setbg_case("ha2")
 } else{
  setbg_case("text-dark")
 }
}


  useEffect(() => {
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["تم صرفه", "متبقي"],
            datasets: [{
                data: [d.released_total, d.s],
                borderColor: [
                    "rgb(75, 192, 192)",
                    "rgb(255, 99, 132)",
                ],
                backgroundColor: [
                  "#77B7B7",
                      
                  "#BE3A45",
                ],
                borderWidth: 0,
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false,
                }],
                yAxes: [{
                    display: false,
                }],
            }
        },

    });
    vv()
}, [])
let date = new Date();
useEffect(() => {
  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [b.project],
  datasets: [{
            data: [Math.floor((Math.abs(date.getTime()-new Date( a.date_start).getTime()))/(1000 * 60 * 60 * 24))],
            label: "منقضي",
            borderColor: "#6A2B56",
            backgroundColor: "#71d1bd",
            borderWidth: 0
        }, {
            data: [Math.floor((Math.abs(new Date( b.Expiry_date).getTime()-date.getTime()))/(1000 * 60 * 60 * 24))],
            label: "متبقي",
            borderColor: "#ffa500",
            backgroundColor: "#F89B4B",
            borderWidth: 0
        }, 
        ]
      },
      options: {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }],
          }
      },
  });
}, [])
useEffect(() => {
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [b.project],
          datasets: [{
              data: [b.Planned_ratio],
              label: "نسبة مخططة",
              borderColor: "rgb(109, 253, 181)",
              backgroundColor: "#77B7B7",
              borderWidth: 0
          }, {
              data: [b.Actual_ratio],
              label: "نسبة فعلية",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "#BE3A45",
              borderWidth: 0
          }
          ]
      },
  });
}, [])

    return ( 
      <AuthRoute>
        <div className="ccc0n  ">
            <div className=" w-100">
               
            <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
            <title>{b.project}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
   <link rel="icon" href="" type="image/x-icon" />

 </Head>
 <nav className="navbar navbar-light ">
  <div className="container">
  
<Link className="mt-5" href={`/`}>
    <a className="navbar-brand mt-5" href="/">
      <img src="https://firebasestorage.googleapis.com/v0/b/arch-86ad1.appspot.com/o/Heritage_Commission_Logo.png?alt=media&token=e8625464-8bc6-4564-a56d-401f62e9ff44"alt="" width="300" height="70" className="d-inline-block align-text-top"/>
    </a>
    </Link>

  </div>
</nav>
<div className="w-100 ccc0n  my-5 lin-it">
<img className="w-100" src={a.covers.imges} alt="" />
<p className="sd text-light h1">{a.project}</p>
</div>
     <div className="row">
       <div className="col-4 col-lg-2 p-2">
         <p className=" text-light text-center p-1 ha3 box1 fs1">رقم التعميد<i className="fas fa-code-branch  ms-2 text-secondary"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.id}</p>
       </div>
        <div className="col-4 col-lg-2 p-2">
         <p className=" text-light text-center ha3 box1 p-1 fs1">ممثل الاستشاري <i class="fas fa-user ms-2 text-secondary"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.Engineer}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className=" text-light text-center ha3 box1 p-1 fs1">مدير المشروع <i class="fas fa-user ms-2 text-secondary"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.manger}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  ha4 box1 text-center p-1 fs1">الإدارة المالكة<i class="fas fa-shapes ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.owner}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  ha4 box1 text-center p-1 fs1">المقاول المتعاقد<i class="fas fa-tools ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.contractor}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  ha4 box1 text-center p-1 fs1">مصدر الميزانية <i class="fas fa-file-invoice-dollar ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.budget_source}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha2 box1 text-light text-center p-1 fs1">مدة المشروع <i class="fas fa-hourglass-half ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{b.Duration_change==0?`${b.Duration}شهر`:`${b.Duration} +${ b.Duration_change}شهر`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha2 box1 text-light text-center p-1 fs1">تاريخ النهاية <i class="fas fa-calendar-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{b.Expiry_date_change==0?b.Expiry_date:b.Duration_change}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha2 box1 text-light text-center p-1 fs1">تاريخ البداية<i class="fas fa-calendar-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.date_start}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha5 box1 text-light text-center p-1 fs1">الإحداثيات<i class="fas fa-map-marker-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.location}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha5 box1 text-light text-center p-1 fs1">المحافظة<i class="fas fa-map-marker-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.city}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha5 box1 text-light text-center p-1 fs1">المنطقة<i class="fas fa-map-marker-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.region}</p>
       </div>
       <div className="col-12  p-2">
         <p className="ha1 box1 text-light text-center p-1 fs1">نطاق المشروع <i class="fas fa-file-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{a.scope}</p>
       </div>
     </div>
     <div className="row">
     <div className="col-12 col-lg-6 p-5">
<h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">حالة المشروع</h4>
<div className="gauge">
        <img className="ca" src="https://r.trckprf.com/v1/redirect?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Farch-86ad1.appspot.com%2Fo%2Fca.svg%3Falt%3Dmedia%26token%3D6a615eee-6e1e-45f3-abea-999ba7bbda08&type=url&abtag=abp:false&api_key=82f7c588c5c440de967254ff11b36c61&site_id=050dbbd223b44242b7f3ca1ea45f2be0&tid=f1115e1d-b327-4899-9ebe-2c3da508da56&dch=gaia&tna=gaia&tv=0.121&title=arch%20-%20Storage%20-%20Files%20-%20Firebase%20console&refr=&page=https%3A%2F%2Fconsole.firebase.google.com%2Fu%2F6%2Fproject%2Farch-86ad1%2Fstorage%2Farch-86ad1.appspot.com%2Ffiles&afsrc=1&cache=RP7CUDP54G3VQTSQ16KB1AVPBHRHI1KG&vid=2&dnt=0&ad_k=ca.svg&ad_t=advertiser&ad_zi=YieldLink&ad_dt=link" alt="" />
        <img className="c2" style={{ transform: `rotate(${b.Weight*100*1.8}deg)`}} src="https://firebasestorage.googleapis.com/v0/b/arch-86ad1.appspot.com/o/c2.svg?alt=media&token=dc5635f6-b4ba-42f4-b76c-b8775fec3fe6" alt="" />
</div>
             
</div>
<div className="col-12 col-lg-6">
 {/* line chart */}
 <h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">ملخص تنفيذي </h4>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart1'></canvas>
        </div>
      </div>
      </div>
<div className="col-12 col-lg-6">
 {/* line chart */}
 <h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">نسب الانجاز الفعلية والمخططة</h4>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
      </div>
      <div className="col-12 col-lg-6">
 {/* line chart */}
 <h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">المنقضي والمتبقي</h4>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart2'></canvas>
        </div>
      </div>
      </div>      
           </div>
     <div className="row">
       <div className="col-4 col-lg-2 p-2">
         <p className="ha7 box1 text-dark text-center fs1">نسبة التباين <i class="fas fa-percent ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{`${Math.floor(b.variance*100)}%`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha7 box1 text-dark text-center fs1"> النهاية المتوقع<i class="fas fa-calendar-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{b.Expiry_date_expected}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha7 box1 text-dark text-center fs1">ميزان المشروع<i class="fas fa-weight ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{`${Math.floor(b.Weight*100)}%`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha4 box1 text-light text-center fs1">{d.Total_change==0?"المبلغ الاجمالي":"المبلغ الاجمالي بعد أمر التغيير"} <i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.Total_change==0?d.Total.toLocaleString():d.Total_change.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha4 box1 text-light text-center fs1">المبلغ المنصرف<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.released_total.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha4 box1 text-light text-center fs1">المبلغ المتبقي<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.s.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha1 box1 text-light text-center fs1">المستخلصات المرفوعة<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.Uploaded_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha1 box1 text-light text-center fs1">مستخلصات صرفت<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.Released_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha1 box1 text-light text-center fs1">مستخلصات لم تصرف<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.noReleased_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha3 box1 text-light text-center fs1">أمر تغيير<i class="fas fa-exchange-alt ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{d.Total_change==0?"لا يوجد":"نعم يوجد"}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha3 box1 text-light text-center fs1">حالة المشروع<i class="fas fa-vote-yea ms-2"></i></p>
         <p className={`${bg_case} text-light text-center fs1`}>{b.case}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="ha3 box1 text-light text-center fs1">حسومات<i class="fas fa-coins ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">.....</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="ha6 box1 text-light text-center fs1">المخاطر والتحديات <i class="fas fa-exclamation-circle ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{c.Challenges==0?"لايوجد":c.Challenges}</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="ha2 box1 text-light text-center fs1">الدعم المطلوب<i class="fas fa-user-edit ms-2"></i></p>
         <p className="bg-light text-dark text-center fs1">{c.Support_required==0?"لايوجد":c.Support_required}</p>
       </div>       
     </div>
     <div className="row"> 
     <p className=" box1 bg-dark text-light text-center col-12"> صور المشروع <i class="fas fa-image ms-2"></i></p>
     {
      a.imges.map(x=>
        <div className="col-6 col-lg-2 p-2" key={x}><a className="w-100" target="_blank" href={x}> <img className="w-100" src={x} alt="" /></a></div>

      )
     }
    {/* <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div> */}
      </div>      
      <div id="accordion">
  <div className="card">
    <div className="card-header" id="headingOne">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
      <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
المستندات التعاقدية
        </button>
      </h5>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body ">
      <div className="p-2 sayed-sa">
             <div className="line ">
               <div className=" w-100 line-fixed">
                <div className="w-100 row">
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle ${bgs1 } wp`}></div>
                     <p className={`text-center rounded p-1 fs1 ${texts1} ${bgs1} mt-3`}> {a.docs.doc1?<a target="_blank" href={a.docs.doc1}>كراسة المشروع</a>:"كراسة المشروع"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle ${bgs2 } wp `} ></div>
                     <p className={`text-center rounded p-1 fs1 ${texts2} ${bgs2} mt-3`}> {a.docs.doc2?<a target="_blank" href={a.docs.doc2}>تسليم الموقع</a>:"تسليم الموقع"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs3} wp`} ></div>
                     <p className={`text-center rounded p-1 fs1 ${texts3} ${bgs3} mt-3`}> {a.docs.doc3?<a target="_blank" href={a.docs.doc3}>العقد</a>:"العقد"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs4} wp`} ></div>
                     <p className={`text-center rounded p-1 fs1 ${texts4} ${bgs4} mt-3`}> {a.docs.doc4?<a target="_blank" href={a.docs.doc4}>أوامر التغيير</a>:"أوامر التغير"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs5} wp`} ></div>
                     <p className={`text-center rounded p-1 fs1 ${texts5} ${bgs5} mt-3`}> {a.docs.doc5?<a target="_blank" href={a.docs.doc5}>استلام ابتدائي</a>:"استلام ابتدائي"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs6} wp`} ></div>
                     <p className={`text-center rounded p-1 fs1 ${texts6} ${bgs6} mt-3`}> {a.docs.doc1?<a target="_blank" href={a.docs.doc1}>استلام نهائي</a>:"استلام نهائي"}</p>
                  </div>
                </div>

               </div>
             </div>
        </div>      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingTwo">
      <h5 className="mb-0">
        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={onshow}>
          ملفات المشروع
        </button>
      </h5>
    </div>
    <div id="collapseTwo" className={`collapse ${show}` } aria-labelledby="headingTwo" data-parent="#accordion">
     
    <iframe className="w-100" src='https://view.officeapps.live.com/op/embed.aspx?src=[OFFICE_FILE_URL]' width='px' height='px' frameborder='0'>
    </iframe>

    </div>
  </div>
  <div className="card">
   
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div className="card-body">
      <div className="p-2">
             <div className="line">

             </div>
        </div>      </div>
    </div>
  </div>
</div> 
    </div>
    </div>
    </AuthRoute>
     );
}
 
export default project;
export async function getStaticPaths() {
  
    const paths =Data.a.map((item)=>{
           return{ 
           params:{id:item.path}
       }
    })
  
    return{
        paths,fallback:false
    }
  }
  export async function getStaticProps(context) {
const id        =context.params.id

const docRefpar = doc(db,'docs',id);
const docSnapar = await getDoc(docRefpar);
const docs=  docSnapar.data()?docSnapar.data():[]
const docRefpar1 = doc(db,'covers',id);
const docSnapar1 = await getDoc(docRefpar1);
const covers=  docSnapar1.data()?docSnapar1.data():0
const docRefpar2 = doc(db,'images',id);
const docSnapar2 = await getDoc(docRefpar2);
const imges=  docSnapar2.data()?docSnapar2.data():{imges:[]}
const partn =  Data.a.find(x=>x.path==id)
const getpartn={...partn,docs:docs,covers:covers,imges:imges.imges}
   
    return {
      props: {item:JSON.stringify(getpartn)}
    }
  }