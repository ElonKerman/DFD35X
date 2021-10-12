import React, { useEffect, useRef, useState } from 'react'
import './mfd-main-style.scss'
import { Dropdown, DropdownType } from './Components/dropdown'
import { FMS_Sys } from './Systems/FMS/FMS_Sys'
import { ATC_COM_Sys } from './Systems/ATC_COM_Sys'
import { SURV_Sys } from './Systems/SURV_Sys'
import { Checklist_Sys } from './Systems/Checklist_Sys'
import { FCU_BKUP_Sys } from './Systems/FCU_BKUP_Sys'
import { useInstrument, useUpdate } from "../Hooks/hooks"
import { FlightPlanManager } from "../flightplanning/FlightPlanManager"
import { render } from '../Hooks/index'
import { FMCDataManager } from './A35X_FMCDataManager'
import { MFD_StateManager } from './MFD_StateManager'
import { HashRouter as Router } from 'react-router-dom';


type Body_Props = {
    side: string,
    dataManager: FMCDataManager,
    stateManager: MFD_StateManager
}
export const MFD_Body = (props: Body_Props) => 
{
    const [page, setPage] = useState(Number);
    const [flightNum, setFlightNum] = useState(String);

    const [didLoad, setDidLoad] = useState(false);

    function currentPage()
    {
        switch(page)
        {
            case 0: 
                return(<FMS_Sys stateManager={props.stateManager} dataManager={props.dataManager}/>);
            case 1:
                return(<ATC_COM_Sys/>);
            case 2:
                return(<SURV_Sys/>);
            case 3:
                return(<Checklist_Sys/>);
            case 4:
                return(<FCU_BKUP_Sys/>);
        }
    }
    useEffect(() => {
        if(!didLoad)
        {
            console.log("Loading Flight Plan")
            setDidLoad(true);
            if(props.stateManager.onUpdate.find(() => onUpdate()) == undefined)
                props.stateManager.onUpdate.push(() => onUpdate());
            onUpdate();
        }
    });
    function onUpdate()
    {
        setFlightNum(props.stateManager.flightNumber);
    }
    return(                 
        <Router>
            <div id={props.side} className="mfd-body">   
                <Dropdown defaultIndex={0} type={DropdownType.system_select} onSelect={(index) => setPage(index)} items={[("FMS" + (props.side === "left" ? "1" : "2")), "ATC COM", "SURV", "C/L MENU", "FCU BKUP"]}></Dropdown>
                <span id="flight-num">{props.stateManager.flightNumber}</span>
                {currentPage()}
            </div>
        </Router>
    );
}
export const MFD_Screen = () => {

    const instrument = useInstrument()
    const [fpManager] = useState(() => new FlightPlanManager(instrument))
    const [dataManager] = useState(() => new FMCDataManager(fpManager));
    //Toggling setUpdate now re renders it
    const [updateNow, setUpdateNow] = useState(true);
    const [stateManager] = useState(() => new MFD_StateManager(() => setUpdateNow(!updateNow), fpManager));
    console.log("re render");

    return(
        <body>
            <MFD_Body stateManager={stateManager} dataManager={dataManager} side="left"/>
            <div className="bck-grey" id="mfd-splitter"></div>
            <MFD_Body stateManager={stateManager} dataManager={dataManager} side="right"/>
        </body>
    )
}
render(<MFD_Screen />)

