import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from "react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Chart } from "chart.js";
import Link from "next/link";
import { useEffect } from "react"
import { Data } from "../json/data";
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-circulargauge';
const Component2 = () => {
  const [data,setdata]=useState(Data)
  const [list,setlist]=useState(Data.a)

  const ww =data.b.map(x=>x.Actual_ratio)
  const weight = ww.reduce(
               (accumulator, currentValue) => accumulator + currentValue,
                                          0,
                                    )
const rr =data.d.map(x=>x.released_total)
const released_total = rr.reduce(
(accumulator, currentValue) => accumulator + currentValue,
  0,
  );
 const ss =data.d.map(x=>x.s)
  const s = ss.reduce(
(accumulator, currentValue) => accumulator + currentValue,
  0,
 );    
  const aweight = weight/ww.length
  let date = new Date();
const dsa = data.b.map(x=>Math.floor((Math.abs(new Date( x.Expiry_date).getTime()-date.getTime()))/(1000 * 60 * 60 * 24)))
const daa = data.a.map(x=>Math.floor((Math.abs(date.getTime()-new Date( x.date_start).getTime()))/(1000 * 60 * 60 * 24)))
    useEffect(() => {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.b.map(x=>x.project),
                datasets: [{
                    data: data.b.map(x=>x.Planned_ratio),
                    label: "مخطط",
                    borderColor: "rgb(109, 253, 181)",
                    backgroundColor: "rgb(109, 253, 181,0.5)",
                    borderWidth: 2
                }, {
                    data: data.b.map(x=>x.Actual_ratio),
                    label: "فعلي",
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgb(255, 99, 132,0.5)",
                    borderWidth: 2
                }
                ]
            },
            
        });
    }, [])
    useEffect(() => {
        var ctx = document.getElementById('myChart1').getContext('2d');
        var myChart1 = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["تم صرفه", "المتبقي"],
                datasets: [{
                    data: [released_total,s],
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
                        display: true,
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
                labels: data.b.map(x=>x.project),
                datasets: [{
                    data: daa,
                    label: "منقضي",
                    borderColor: "#3cba9f",
                    backgroundColor: "#71d1bd",
                    borderWidth: 2
                }, {
                    data: dsa,
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
    
    const ch =data.b.filter(x=>x.Expiry_date_change!=0)
    const ca =data.b.map(x=>x.case)
    const uncase = [...new Set(ca)];
    const ow =data.a.map(x=>x.owner)
    const unow = [...new Set(ow)];
    const ma =data.a.map(x=>x.manger)
    const unma= [...new Set(ma)];
    const onmanger = (e) =>setlist(data.a.filter(x=>x.manger==e.target.value)) 
    const onowner = (e) =>setlist(data.a.filter(x=>x.owner==e.target.value))
    const oncase = (e) =>{ const dff = data.b.filter(x=>x.case==e.target.value)
      setlist(data.a.filter(x=>dff.find(c=>c.ID==x.id)))
    }
    const oncha = (e) =>{ if(e.target.value==0){
      const cha=data.b.filter(x=>x.Expiry_date_change==0)
      setlist(data.a.filter(x=>cha.find(c=>c.ID==x.id)))

    }else{
      const cha=data.b.filter(x=>x.Expiry_date_change!=0)
      setlist(data.a.filter(x=>cha.find(c=>c.ID==x.id)))
    }
    }
       return (  
        <div className=" rela ccc0n mt-5">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
crossOrigin="anonymous">
</script>
<div className="row">

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

      <div className="col-12 col-lg-6">
 {/* line chart */}
 <h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">المنصرف والمتبقي</h4>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart1'></canvas>
        </div>
      </div>
      </div>
      <div className="col-12 col-lg-6">
<h4 className="w-[110px] mx-auto my-3 text-center text-xl font-semibold capitalize ">حالة المشروع</h4>
  <CircularGaugeComponent >
    <AxesDirective>
      <AxisDirective>
        <PointersDirective>
          <PointerDirective value={Math.floor(aweight*100)}></PointerDirective>
        </PointersDirective>
      </AxisDirective>
    </AxesDirective>
  </CircularGaugeComponent>
            
</div>

</div>
<div className="row mt-5">
<i class="fas fa-lg fa-filter w-10"></i>

<select class="form-select w-20 mx-1 " aria-label="Default select example" onChange={onmanger} >
  <option selected>مدير المشروع </option>
  {
    unma.map(x=><option key={x} value={x}>{x}</option>)
  }
  </select>
  <select class="form-select w-20 mx-1 " aria-label="Default select example" onChange={onowner} >
  <option selected>الإدارة المالكة</option>
  {
   unow.map(x=><option key={x} value={x}>{x}</option>)
  }
  </select>
  <select class="form-select w-20 mx-1 " aria-label="Default select example" onChange={oncase}>
  <option selected>حالة المشروع</option>
  {
    uncase.map(x=><option key={x} value={x}>{x}</option>)
  }
  </select>
  <select class="form-select w-20 mx-1 " aria-label="Default select example" onChange={oncha}>
  <option selected>أوامر التغير</option>
  
    <option  value={0}>لا يوجد</option>
    <option  value={1}>يوجد</option>
 
  </select>
</div>
<table className="table table-striped mt-3">
  <thead>
    <tr>
      <th scope="col">رقم التعميد</th>
      <th scope="col">اسم المشروع</th>
      <th scope="col">المنطقة</th>
      <th scope="col">الإدارة المالكة</th>
    </tr>
  </thead>
  <tbody>
    {
      list.map(x=>
        <tr key={x.id}>
      <th scope="row">{x.id}</th>
      <td><Link href={`/Project/${x.path}`}>
     <a className="nav-link ul-text " >{x.project}</a>
     </Link>  </td>
      <td>{x.region}</td>
      <td>{x.owner}</td>
    </tr>
      )
    }
    
  </tbody>
</table>
</div>
    );
}
 
export default Component2;