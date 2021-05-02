import ReactDOM from 'react-dom'
import {useState} from 'react'
import './efis-main-style.scss'
import { render } from '../Hooks/index'
import {useUpdate} from '../Hooks/hooks'
import {useSimVar} from '../Hooks/simVars'

import Mask from "./imgs/EFIS_MASK.png";
import overlay from "./imgs/staticoverlay.png";
import horizon from "./imgs/EFIS_PFD_HORIZON.png";
import horizonDisp from "./imgs/EFIS_PFD_HORIZON_disp.png";
import airspeedIndicator from "./imgs/EFIS_PFD_AIRSPEED_INDICATOR.png";
import airspeedIndicatorOverlay from "./imgs/EFIS_PFD_AIRSPEED_INDICATOR.png";


const EFIS_SCREEN = () => {
    const [pitchVar, setPitchVar] = useSimVar('A:PLANE PITCH DEGREES', 'degrees')
    const [rollVar, setRollVar] = useSimVar('A:PLANE BANK DEGREES', 'degrees')
    const [IASVar, setIASVar] = useSimVar('A:AIRSPEED INDICATED', 'knots')
    const [altMSLVar, setAltMSLVar] = useSimVar('A:INDICATED ALTITUDE', 'feet')

    let [pitch, setPitch] = useState(0)
    let [roll, setRoll] = useState(0)
    let [IAS, setIAS] = useState(0)
    let [altMSL, setAltMSL] = useState(0)
    
    useUpdate(dt => {
        setPitch(pitchVar)
        setRoll(rollVar)
        setIAS(IASVar)
        setAltMSL(altMSLVar)
    })
    
    let altitudeTapeArray = []
    for (const x of Array(84)) {
        altitudeTapeArray.push(x)
    }
    altitudeTapeArray.reverse()

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
                <ul>{altitudeTapeArray.map((number, i) => <li key={i}>{number}</li>)}</ul>
            </div>

            <div id="info">
                <h1>Airspeed: {Math.round(IAS)}</h1>
                <h1>Altitude MSL: {Math.round(altMSL)}</h1>
            </div>
        </div>
    )
}

render(<EFIS_SCREEN />)