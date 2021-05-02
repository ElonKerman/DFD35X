
import React, { useState } from 'react'
import {Dropdown, DropdownType} from '../../Components/dropdown'
import './fms_style.scss'
import {FMS_Init} from './Pages/FMS_Init'
import {FMS_Perf} from './Pages/FMS_Perf'
import { FlightPlanManager } from '../../../flightplanning/FlightPlanManager'
import { FMCDataManager } from '../../A35X_FMCDataManager'
import { MFD_StateManager } from '../../MFD_StateManager'

type FMS_Props =
{
    dataManager: FMCDataManager,
    stateManager: MFD_StateManager
}
export const FMS_Sys =(props: FMS_Props) =>
{
    const [currentPage, setCurrentPage] = useState(String)
    
    function getPage()
    {
        switch(currentPage)
        {
            case("ACTIVE/INIT"):
                return(<FMS_Init stateManager={props.stateManager} dataManager={props.dataManager}/>);
            case("ACTIVE/PERF"):
                return(<FMS_Perf/>);
        }
    }
    function selectActivePage(index: number)
    {
        switch(index)
        {
            case(0):
                setCurrentPage("ACTIVE/F-PLN");
                break;
            case(1):
                setCurrentPage("ACTIVE/PERF");
            break;
            case(2):
                setCurrentPage("ACTIVE/FUEL&LOAD");
                break;
            case(3):
                setCurrentPage("ACTIVE/WIND");
                break;
            case(4):
            setCurrentPage("ACTIVE/INIT");
                break;
        }
    }
    return(
        <div className="SystemWindow">               
            <Dropdown label="ACTIVE" onSelect={(i) => selectActivePage(i)} type={DropdownType.general_bar} items={["F-PLN", "PERF", "FUEL&LOAD", "WIND", "INIT"]}/>
            <Dropdown label="POSITION" onSelect={(i) => console.log("Selected " + i)} offsetX={25} type={DropdownType.general_bar} items={["POSITION"]}/>
            <Dropdown label="SEC INDEX" onSelect={(i) => console.log("Selected " + i)} offsetX={50} type={DropdownType.general_bar} items={["SEC INDEX"]}/>
            <Dropdown label="DATA" onSelect={(i) => console.log("Selected " + i)} offsetX={75} type={DropdownType.general_bar} items={["DATA"]}/>                              
            <div id="fms-header" className="bck-white frnt-grey"><h1>{currentPage}</h1></div>
            {getPage()}             
        </div>
    );
    
}