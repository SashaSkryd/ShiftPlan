import React from 'react';
import './Ruler.scss'


function rulerPart(time){
    return <li className="first-point">

        <span className='time-indicator'>{time.length <= 1 ? `0${time}:00` : `${time}:00`}</span>

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
        </ul>
    </li>
};

function rulerRender (){
    
let ruler  = ''

    for(let i = 0;i<24;i++){
        
       ruler += rulerPart(i);
    }
    console.dir(ruler,'Ruler');

    return ruler
}

export default function Ruler (){

    return(
        <div className='ruler-wraper'>
            <ul className='ruler'>
                {rulerRender ()}
            </ul>
        </div>
    );
};