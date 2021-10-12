import React from 'react'
import { useState } from 'react'
import './efis-main-style.scss'
import { render } from '../Hooks/index'
import { useUpdate } from '../Hooks/hooks'
import { useSimVar } from '../Hooks/simVars'

import Mask from './imgs/EFIS_MASK.png';
import overlay from './imgs/staticoverlay.png';
import horizon from './imgs/EFIS_PFD_HORIZON.png';
import horizonDisp from './imgs/EFIS_PFD_HORIZON_disp.png';
import airspeedIndicator from './imgs/EFIS_PFD_AIRSPEED_INDICATOR.png';
import airspeedIndicatorOverlay from './imgs/EFIS_PFD_AIRSPEED_INDICATOR_OVERLAY.png';


const EFIS_SCREEN = () => {
    const [pitch] = useSimVar('A:PLANE PITCH DEGREES', 'degrees')
    const [roll] = useSimVar('A:PLANE BANK DEGREES', 'degrees')
    const [IAS] = useSimVar('A:AIRSPEED INDICATED', 'knots')
    const [altMSL] = useSimVar('A:INDICATED ALTITUDE', 'feet')
    
    let altArray: number[] = [];
    for (const x of Array(84).keys()) {
        altArray.push(x * 500)
    }
    altArray = altArray.reverse();

    return(
        <div>
            <div id="background">
                <img src={Mask}/>
            </div>

            <div id="static_overlay">
                <img src={overlay}/>
            </div>

            <div id="horizon">
                <img src={horizon} style={{
                    transformOrigin: `center ${2000 - (-pitch*7.4)}px`, 
                    transform: 'translateY( ' + (-pitch * 7.4).toString() + 
                    'px) rotate(' + roll.toString() + 'deg'
                }}/>
            </div>
            <div id="horizon_indicator">
                <img src={horizonDisp}/>
            </div>

            <div id="airspeed_indicator">
                <img src={airspeedIndicator} style={{
                    transform: IAS >= 30 ? 'translateY(' + ((IAS - 30) * 3.8).toString() + 'px)' : 'none'
                }}/>
            </div>
            <div id="airspeed_indicator_overlay">
                <img src={airspeedIndicatorOverlay}/>
            </div>

            <div id="altitude_indicator">
                <ul>{altArray.map((number, i) => <li key={i}>{number}</li>)}</ul>
            </div>

            <div id="info">
                <h1>Airspeed: {Math.round(IAS)}</h1>
                <h1>Altitude MSL: {Math.round(altMSL)}</h1>
            </div>
        </div>
    )
}

render(<EFIS_SCREEN />)