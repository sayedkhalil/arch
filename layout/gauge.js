const Gauge = (props) => {
    return (  
     <div className="gauge">
        <img className="ca" src="ca.svg" alt="" />
        <img className="c2" style={{ transform: `rotate(${props.data*1.8}deg)`}} src="c2.svg" alt="" />
</div>
 );
}

export default Gauge;