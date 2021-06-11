import React from 'react';
import './Ruler.scss'

const time = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

function rulerPart(el){
    return <li className="first-point">
    <span className='time-indicator'>{el.toString().length === 1 ? `0${el}:00` : `${el}:00`}</span>
    <ul>
        <li className="small-point"></li>
        <li className="small-point"></li>
        <li className="medium-point"></li>
        <li className="small-point"></li>
        <li className="small-point"></li>
        <li className="high-point"></li>
        <li className="small-point"></li>
        <li className="small-point"></li>
        <li className="medium-point"></li>
        <li className="small-point"></li>
        <li className="small-point"></li>
        <li className="main-point"></li>
    </ul>
</li>
};

export default function Ruler (){
    return(
        <div className='ruler-wraper'>
            <ul className='ruler'>
                {time.map(el=>
                   rulerPart(el)
                )}
            </ul>      
        </div>
    );
};

