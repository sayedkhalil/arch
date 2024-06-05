import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { db, storage } from "../../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc,getDoc, query, where } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../../AppContext";
import { Data } from "../../json/data";
import AuthRoute from "../../authrout";
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-circulargauge';
const project = ({item}) => {
 const a=JSON.parse(item)
 console.log(a)
 const b =Data.b.find(x=>x.ID==a.id)
 const c =Data.c.find(x=>x.ID==a.id)
 const d =Data.d.find(x=>x.ID==a.id)  
  
const[bgs1,setbgs1]=useState("bg-secondary")
const[bgs2,setbgs2]=useState("bg-secondary")
const[bgs3,setbgs3]=useState("bg-secondary")
const[bgs4,setbgs4]=useState("bg-secondary")
const[bgs5,setbgs5]=useState("bg-secondary")
const[bgs6,setbgs6]=useState("bg-secondary")
const[texts1,settexts1]=useState("text-secondary")
const[texts2,settexts2]=useState("text-secondary")
const[texts3,settexts3]=useState("text-secondary")
const[texts4,settexts4]=useState("text-secondary")
const[texts5,settexts5]=useState("text-secondary")
const[texts6,settexts6]=useState("text-secondary")
const[show,setshow]=useState("")
const onshow =()=>  show==""?setshow("show"):setshow("")
const vv =()=>{
  if(a.docs.doc1){setbgs1("bg-success");
settexts1("text-success")}
if(a.docs.doc2){setbgs2("bg-success");
settexts2("text-success")}
if(a.docs.doc3){setbgs3("bg-success");
settexts3("text-success")}
if(a.docs.doc4){setbgs4("bg-success");
settexts4("text-success")}
if(a.docs.doc5){setbgs5("bg-success");
settexts5("text-success")}
if(a.docs.doc6){setbgs6("bg-success");
settexts6("text-success")}
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
                    "rgb(75, 192, 192 )",
                    "rgb(255, 99, 132)",
                ],
                borderWidth: 2,
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
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            borderWidth: 2
        }, {
            data: [Math.floor((Math.abs(new Date( b.Expiry_date).getTime()-date.getTime()))/(1000 * 60 * 60 * 24))],
            label: "متبقي",
            borderColor: "#ffa500",
            backgroundColor: "#ffc04d",
            borderWidth: 2
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
              backgroundColor: "rgb(109, 253, 181,0.5)",
              borderWidth: 2
          }, {
              data: [b.Actual_ratio],
              label: "نسبة فعلية",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132,0.5)",
              borderWidth: 2
          }
          ]
      },
  });
}, [])

    return ( 
      <AuthRoute>
        <div className="ccc0n">
            <div className="ccc0n">
               
            <Head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <title>{b.project}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
   <link rel="icon" href="" type="image/x-icon" />

 </Head>
 
<div className="w-100 my-5 lin-it">
<img className="w-100" src={a.covers.imges} alt="" />
<p className="sd text-light h1">{a.project}</p>
</div>
     <div className="row">
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد<i class="fas fa-code-branch  ms-5 text-secondary"></i></p>
         <p className="bg-light text-dark text-center">{a.id}</p>
       </div>
        <div className="col-4 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">ممثل الاستشاري <i class="fas fa-user ms-5 text-secondary"></i></p>
         <p className="bg-light text-dark text-center">{a.Engineer}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع <i class="fas fa-user ms-5 text-secondary"></i></p>
         <p className="bg-light text-dark text-center">{a.manger}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  bg-info text-center">الإدارة المالكة<i class="fas fa-shapes ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.owner}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  bg-info text-center">المقاول المتعاقد<i class="fas fa-tools ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.contractor}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="text-light  bg-info text-center">مصدر الميزانية <i class="fas fa-file-invoice-dollar ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.budget_source}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">مدة المشروع <i class="fas fa-hourglass-half ms-5"></i></p>
         <p className="bg-light text-dark text-center">{b.Duration_change==0?`${b.Duration}شهر`:`${b.Duration} +${ b.Duration_change}شهر`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">تاريخ النهاية <i class="fas fa-calendar-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{b.Expiry_date_change==0?b.Expiry_date:b.Duration_change}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">تاريخ البداية<i class="fas fa-calendar-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.date_start}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-warning text-light text-center">الإحداثيات<i class="fas fa-map-marker-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.location}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-warning text-light text-center">المحافظة<i class="fas fa-map-marker-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.city}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-warning text-light text-center">المنطقة<i class="fas fa-map-marker-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.region}</p>
       </div>
       <div className="col-12  p-2">
         <p className="bg-primary text-light text-center">نطاق المشروع <i class="fas fa-file-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{a.scope}</p>
       </div>
     </div>
     <div className="row">
     <div className="col-12 col-lg-6">
<h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">حالة المشروع</h4>
  <CircularGaugeComponent >
    <AxesDirective>
      <AxisDirective>
        <PointersDirective>
          <PointerDirective value={Math.floor(b.Weight*100)}></PointerDirective>
        </PointersDirective>
      </AxisDirective>
    </AxesDirective>
  </CircularGaugeComponent>
            
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
         <p className="bg-secondary text-light text-center">نسبة التباين <i class="fas fa-percent ms-5"></i></p>
         <p className="bg-light text-dark text-center">{`${Math.floor(b.variance*100)}%`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-secondary text-light text-center"> النهاية المتوقع<i class="fas fa-calendar-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{b.Expiry_date_expected}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-secondary text-light text-center">ميزان المشروع<i class="fas fa-weight ms-5"></i></p>
         <p className="bg-light text-dark text-center">{`${Math.floor(b.Weight*100)}%`}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-danger text-light text-center">{d.Total_change==0?"المبلغ الاجمالي":"المبلغ الاجمالي بعد أمر التغيير"} <i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.Total_change==0?d.Total.toLocaleString():d.Total_change.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-danger text-light text-center">المبلغ المنصرف<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.released_total.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-danger text-light text-center">المبلغ المتبقي<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.s.toLocaleString()}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-info text-light text-center">المستخلصات المرفوعة<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.Uploaded_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-info text-light text-center">مستخلصات صرفت<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.Released_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-info text-light text-center">مستخلصات لم تصرف<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.noReleased_extracts}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">أمر تغيير<i class="fas fa-exchange-alt ms-5"></i></p>
         <p className="bg-light text-dark text-center">{d.Total_change==0?"لا يوجد":"نعم يوجد"}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">حالة المشروع<i class="fas fa-vote-yea ms-5"></i></p>
         <p className="bg-light text-dark text-center">{b.case}</p>
       </div>
       <div className="col-4 col-lg-2 p-2">
         <p className="bg-success text-light text-center">حسومات<i class="fas fa-coins ms-5"></i></p>
         <p className="bg-light text-dark text-center">.....</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="bg-danger text-light text-center">المخاطر والتحديات <i class="fas fa-exclamation-circle ms-5"></i></p>
         <p className="bg-light text-dark text-center">{c.Challenges==0?"لايوجد":c.Challenges}</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="bg-primary text-light text-center">الدعم المطلوب<i class="fas fa-user-edit ms-5"></i></p>
         <p className="bg-light text-dark text-center">{c.Support_required==0?"لايوجد":c.Support_required}</p>
       </div>       
     </div>
     <div className="row"> 
     <p className="bg-dark text-light text-center col-12"> صور المشروع <i class="fas fa-image ms-5"></i></p>
     {
      a.imges.map(x=>
        <div className="col-6 col-lg-2 p-2" key={x}> <img className="w-100" src={x} alt="" /></div>

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
                     <p className={`text-center ${texts1} mt-3`}> {a.docs.doc1?<a target="_blank" href={a.docs.doc1}>كراسة المشروع</a>:"كراسة المشروع"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle ${bgs2 } wp `} ></div>
                     <p className={`text-center ${texts2} mt-3`}> {a.docs.doc2?<a target="_blank" href={a.docs.doc2}>تسليم الموقع</a>:"تسليم الموقع"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs3} wp`} ></div>
                     <p className={`text-center ${texts3} mt-3`}> {a.docs.doc3?<a target="_blank" href={a.docs.doc3}>العقد</a>:"العقد"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs4} wp`} ></div>
                     <p className={`text-center ${texts4} mt-3`}> {a.docs.doc4?<a target="_blank" href={a.docs.doc4}>أوامر التغيير</a>:"أوامر التغير"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs5} wp`} ></div>
                     <p className={`text-center ${texts5} mt-3`}> {a.docs.doc5?<a target="_blank" href={a.docs.doc5}>استلام ابتدائي</a>:"استلام ابتدائي"}</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className={`rounded-circle  ${bgs6} wp`} ></div>
                     <p className={`text-center ${texts6} mt-3`}> {a.docs.doc1?<a target="_blank" href={a.docs.doc1}>استلام نهائي</a>:"استلام نهائي"}</p>
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
     
    <iframe className="w-100" src='https://onedrive.live.com/embed?cid=5FAC7D8A540D1B7A&resid=5FAC7D8A540D1B7A%21143&authkey=AMrmlVIx_LeyX_g&em=2&wdAr=1.7777777777777777&Embed=1' frameborder="0" scrolling="yes"></iframe>

  
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