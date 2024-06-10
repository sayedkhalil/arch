import Head from "next/head";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useState } from "react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import useSWR from 'swr';
import { useEffect } from "react"
import { Data } from "../json/data";
const Component1 = () => {
        const [data,setdata]=useState(Data)
         const com = data.b.filter(x=>x.case=="مكتمل")
         const suc = data.b.filter(x=>x.case=="على المسار")
         const re = data.b.filter(x=>x.case=="تأخر جزئي")
         const rel = data.b.filter(x=>x.case=="متأخر")
         const tt =data.d.map(x=>x.Total)
         const total = tt.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0,
              );
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
        const uu =data.d.map(x=>x.Uploaded_extracts)
        const Uploaded_extracts = uu.reduce(
                                                      (accumulator, currentValue) => accumulator + currentValue,
                                                      0,
                                                    );   
        const nn =data.d.map(x=>x.noReleased_extracts)
        const noReleased_extracts = nn.reduce(
                                                                           (accumulator, currentValue) => accumulator + currentValue,
                                                                                            0,
                                                                                ); 
        const ww =data.b.map(x=>x.Actual_ratio*x.Weight)
        const aweight = ww.reduce(
                     (accumulator, currentValue) => accumulator + currentValue,
                                                0,
                                          )
        
        const ch =data.b.filter(x=>x.Expiry_date_change!=0)                                                         
       return (  
        <div className=" row  ccc0n mt-5">
        <Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>

        </Head>
<div className="ccc0n  row">
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center haa h3 fs-3 mt-1 ">{data.a.length}</p>
        <p className="text-center fs1 box p-1 text-light ha1 box ">عدد المشاريع <i class="fas fa-place-of-worship ms-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 fs-3 mt-1 ">{com.length}</p>
        <p className="text-center fs1 box p-1 text-light  ha3">المشاريع المكتملة<i class="fas fa-place-of-worship ms-3"></i></p>
        </div>   
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 fs-3 haaa1 mt-1 ">{suc.length}</p>
        <p className="text-center fs1  box p-1 text-light ha2 ">مشاريع على المسار<i class="fas fa-place-of-worship ms-3"></i></p>
        </div> 
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 fs-3 haaa2 mt-1 ">{re.length}</p>
        <p className="text-center fs1 box p-1 text-dark ha4 ">مشاريع متأخرة جزئيا<i class="fas fa-place-of-worship ms-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 fs-3 haaa3 mt-1 ">{rel.length}</p>
        <p className="text-center fs1 box p-1 text-light ha6 ">مشاريع متأخرة <i class="fas fa-place-of-worship ms-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 ">
        <p className="text-center h3 fs-3 mt-1 ">{`%${Math.floor(aweight*100)}`}</p>
        <p className="text-center box  fs1 p-1 text-light ha5 ">حالة المشاريع <i class="fas fa-tachometer-alt ms-3"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 bgsd ">
        <p className="text-center  h3 fs-3 mt-1 ">{total.toLocaleString()}</p>
        <p className="text-center fs1  p-1 text-dark bgcard ">قيمة المشاريع <i class="fas fa-money-bill-wave ms-3 text-light"></i></p>
        </div>    
        <div className="col-6 col-lg-2 p-2 bgsd">
        <p className="text-center h3 fs-3 mt-1 ">{released_total .toLocaleString()}</p>
        <p className="text-center fs1  p-1 text-dark bgcard ">المنصرف<i class="fas fa-money-bill-wave ms-3 text-light"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 bgsd">
        <p className="text-center h3 fs-3 mt-1 ">{s .toLocaleString()}</p>
        <p className="text-center fs1  p-1 text-dark bgcard ">المتبقي<i class="fas fa-money-bill-wave ms-3 text-light"></i></p>
        </div>   
        <div className="col-6 col-lg-2 p-2 bgsd">
        <p className="text-center h3 fs-3 mt-1 ">{Uploaded_extracts}</p>
        <p className="text-center fs1  p-1 text-dark bgcard "> مستخلصات مرفوعة<i class="fas fa-money-bill-wave ms-3 text-light"></i></p>
        </div> 
        <div className="col-6 col-lg-2 p-2 bgsd">
        <p className="text-center h3 fs-3 mt-1 ">{noReleased_extracts}</p>
        <p className="text-center fs1  p-1 text-dark bgcard ">مستخلصات لم تصرف<i class="fas fa-money-bill-wave ms-3 text-light"></i></p>
        </div>
        <div className="col-6 col-lg-2 p-2 bgsd">
        <p className="text-center h3 fs-3 mt-1 ">{ch.length}</p>
        <p className="text-center fs1  p-1 text-dark bgcard ">أوامر التغيير <i class="fas fa-exchange-alt ms-3 text-light"></i></p>
        </div>    
</div>
</div>
    );
}
 
export default Component1;