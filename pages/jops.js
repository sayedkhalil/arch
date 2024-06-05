import Head from "next/head";
import { db, storage } from "../firebase";
import { collection, addDoc ,getDocs,doc,Timestamp,deleteDoc , setDoc, query, where} from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";
import { Chart } from "chart.js";
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-circulargauge';
import { async } from "@firebase/util";
import useSWR from 'swr';
const Jops = () => {


  
  const [services,setservices]=useState([])

  const [category,setcategory]=useState([]);
  const de=[]
  
  const [appState, setAppState] = useAppContext();
  const router = useRouter()
  useEffect(async()=>{
      const codelist = collection(db, 'jops');
      const codesnapshot = await getDocs(codelist);
      const catolist = codesnapshot.docs?codesnapshot.docs.map(doc =>{ de.push(doc.data());   }):de
      setservices(de)
      console.log(services)
      return catolist
     },[])
  // const handelrouter=(e,path)=>{
  //         e.preventDefault() 
  //         router.push(`product/${path}`)
  //     }
  //     const oncart =async(x,y)=> {
  //     const myArrayFromLocalStorage = localStorage.getItem('mycart')
  //     if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
  //     var myArray = JSON.parse(myArrayFromLocalStorage)}else{var myArray=[]  }
  //          myArray.push({"code":x,"title":y,"img":z})
  //         localStorage.setItem("mycart", JSON.stringify(myArray))
  //         setAppState(myArray)
  //         }  
      
  

  useEffect(() => {
    var ctx = document.getElementById('myChart1').getContext('2d');
    var myChart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Accepted", "Pending", "Rejected"],
            datasets: [{
                data: [70, 10, 6],
                borderColor: [
                    "rgb(75, 192, 192)",
                    "rgb(255, 205, 86)",
                    "rgb(255, 99, 132)",
                ],
                backgroundColor: [
                    "rgb(75, 192, 192 )",
                    "rgb(255, 205, 86)",
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
}, [])
    
useEffect(() => {
  var ctx = document.getElementById('myChart2').getContext('2d');
  var myChart2 = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
              data: [70, 90, 44, 60, 83, 90, 100],
              label: "Accepted",
              borderColor: "#3cba9f",
              backgroundColor: "#71d1bd",
              borderWidth: 2
          }, {
              data: [10, 21, 60, 44, 17, 21, 17],
              label: "Pending",
              borderColor: "#ffa500",
              backgroundColor: "#ffc04d",
              borderWidth: 2
          }, {
              data: [6, 3, 2, 2, 7, 0, 16],
              label: "Rejected",
              borderColor: "#c45850",
              backgroundColor: "#d78f89",
              borderWidth: 2
          }
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
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
              data: [66, 144, 146, 116, 107, 131, 43],
              label: "Applied",
              borderColor: "rgb(109, 253, 181)",
              backgroundColor: "rgb(109, 253, 181,0.5)",
              borderWidth: 2
          }, {
              data: [40, 100, 44, 70, 63, 30, 10],
              label: "Accepted",
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgb(75, 192, 192,0.5)",
              borderWidth: 2
          }, {
              data: [20, 24, 50, 34, 33, 23, 12],
              label: "Pending",
              borderColor: "rgb(255, 205, 86)",
              backgroundColor: "rgb(255, 205, 86,0.5)",
              borderWidth: 2
          }, {
              data: [6, 20, 52, 12, 11, 78, 21],
              label: "Rejected",
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgb(255, 99, 132,0.5)",
              borderWidth: 2
          }
          ]
      },
  });
}, [])

    return ( 
        <div className="">
            <div className="">
                <img className="w-100" src="100.jpg" alt="" />
            <Head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
    <title>الوظائف</title>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
   <link rel="icon" href="/icon.svg" type="image/x-icon" />
            </Head>
   
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
    
     <div className="row">
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">aaasas</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-12  p-2">
         <p className="bg-dark text-light text-center">نطاق المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
     </div>
     <div className="row">
     <div class="col-12 col-lg-6">
<h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">حالة المشروع</h4>
  <CircularGaugeComponent >
    <AxesDirective>
      <AxisDirective>
        <PointersDirective>
          <PointerDirective value={35}></PointerDirective>
        </PointersDirective>
      </AxisDirective>
    </AxesDirective>
  </CircularGaugeComponent>
            
</div>
<div className="col-12 col-lg-6">
 {/* line chart */}
 <h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">ملخص تنفيذي للمشاريع</h4>
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
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">رقم التعميد</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مدير المشروع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-6 col-lg-2 p-2">
         <p className="bg-dark text-light text-center">مهندس الموقع</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="bg-dark text-light text-center">المخاطر والتحديات</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>
       <div className="col-12 col-lg-6 p-2">
         <p className="bg-dark text-light text-center">الدعم المطلوب</p>
         <p className="bg-light text-dark text-center">254100000000</p>
       </div>       
     </div>
     <div className="row"> 
     <p className="bg-dark text-light text-center col-12"> صور المشروع </p>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
    <div className="col-6 col-lg-2 p-2"> <img className="w-100" src="100.jpg" alt="" /></div>
      </div>      
      <div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
المستندات التعاقدية
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
      <div className="p-2 sayed-sa">
             <div className="line ">
               <div className=" w-100 line-fixed">
                <div className="w-100 row">
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-success wp" ></div>
                     <p className="text-center mt-3 text-success"> كراسة المشروع</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-success wp wp" ></div>
                     <p className="text-center mt-3 text-success"> تسليم الموقع</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-dark wp" ></div>
                     <p className="text-center mt-3"> العقد</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-dark wp" ></div>
                     <p className="text-center mt-3"> أوامر التغير</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-dark wp" ></div>
                     <p className="text-center mt-3"> استلام ابتدائي</p>
                  </div>
                  <div className="lin-it col-2">
                    <div  className="rounded-circle bg-dark wp" ></div>
                     <p className="text-center mt-3"> استلام نهائي</p>
                  </div>
                </div>

               </div>
             </div>
        </div>      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          ملفات المشروع
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        <div className="p-2">
             <div className="line">

             </div>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        معالم المشروع
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
      <div className="p-2">
             <div className="line">

             </div>
        </div>      </div>
    </div>
  </div>
</div> 
    </div>
    </div>
     );
}
 
export default Jops;
