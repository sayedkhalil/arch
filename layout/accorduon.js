import { useEffect, useState } from "react";
import Head from "next/head";

const Accordion = (props) => {
    const [isActive, setIsActive] = useState(false)
    const[ll,setll]=useState(props.data.content)
    const ww =props.data.content.map(x=>x.rate*x.weight)
    const aweight = ww.reduce(
                 (accumulator, currentValue) => accumulator + currentValue,
                                            0,
                                      )
                                      console.log(ll)
    return (

      <div className=" acco">
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Almarai&display=swap" rel="stylesheet"></link>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"/>
   
            </Head>
        <div
          className="accordion-title row m-auto acco p-2"
          onClick={() => setIsActive((prevIsActive) => !prevIsActive)}
        >
          <p className="col-12 col-lg-6 fs1 ha7 text-center p-2">{props.data.title}</p>
          <div class="p-3 col-11 col-lg-5">
          <div class="progress ">
          <div class="progress-bar" role="progressbar" style={{width:`${Math.floor(aweight*100)}%` }} aria-valuenow={`${Math.floor(aweight*100)}%`} aria-valuemin="0" aria-valuemax="100">{`${Math.floor(aweight*100)}%`}</div>
          </div>
          </div>
          <div className="col-1  text-end p-1 h3">{isActive ? "-" : "+"}</div>
        </div>
        {isActive && <div className="accordion-content p-3 border-1 border rounded vli">
            <div className="vli1 ">
            </div>
{/* {ll.map(x=>{
 <div className="w-100 itcv border-bottom row "  style={{height:`${Math.floor(x.weight*100)}%`}}>
 <div class="p-3 col-2">
<div class="progress ">
<div class="progress-bar bg-info" role="progressbar" style={{width: `${Math.floor(x.rate*100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
</div>  
</div> 
 <p className="col-8 text-center fs1">{x.milestone}</p>
 <div className="col-2 p-4 row">
     
     <p className="bg-light fs1 text-dark col-6 p-2">{x.weight}</p>
     <p className="ha2 fs1 text-light col-6 p-2">وزن المعلم</p>

 </div>
 <div className="vli2 "style={{height:`${Math.floor(x.rate*100)}%`}}>
</div>
 <div  className={`rounded-circle  wp1`}></div>
                 </div>
})} */}
{
    ll.map(x=><div className="w-100">
     <div className="w-100 itcv border-bottom row "  style={{height:`${Math.floor(x.weight*100*20)}px`}}>
 <div class="p-3 col-3 col-lg-2">
<div class="progress ">
<div class="progress-bar bg-info" role="progressbar" style={{width: `${Math.floor(x.rate*100)}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{`${Math.floor(x.rate*100)}%`}</div>
</div>  
</div> 
 <p className="col-8 col-lg-8 text-center fs1">{x.milestone}</p>
 <div className="col-1 col-lg-2 p-4 hpm row">
     
     <p className="bg-light text-center fs1 text-dark col-6 p-2">{`${Math.floor(x.weight*100)}%`}</p>
     <p className="ha2 d-none d-lg-block bg-secondary text-light col-6 p-2">وزن المعلم</p>

 </div>
 <div className="vli2 "style={{height:`${Math.floor(x.rate*100)}%`}}>
</div>
 <div  className={`rounded-circle  wp1`}></div>
                 </div>
    </div>)
}

                               
                                
                </div>
            }
      </div>
    )
  }
  
  export default Accordion