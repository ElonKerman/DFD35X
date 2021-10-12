import React, { useState } from 'react'
import {Dropdown, DropdownType} from '../../Components/dropdown'
import './fms_style.scss'
import { FlightPlanManager } from '../../../flightplanning/FlightPlanManager'
import { FMCDataManager } from '../../A35X_FMCDataManager'
import { MFD_StateManager } from '../../MFD_StateManager'
import { FMS_Pages } from './Pages/index'
import { Route, HashRouter as Router, Switch, useHistory } from 'react-router-dom';

type FMS_Props =
{
    dataManager: FMCDataManager,
    stateManager: MFD_StateManager
}
export const FMS_Sys =(props: FMS_Props) =>
{
    const history = useHistory();
    history.push("/active/init");
    function selectActivePage(index: number)
    {
        switch(index)
        {
            case(0):
                history.push("/active/f-pln");
                break;
            case(1):
                history.push("/active/perf");
            break;
            case(2):
                history.push("/active/fuelload");
            break;
            case(3):
                history.push("/active/wind");
            break;
            case(4):
                history.push("/active/init");
            break;
        }
    }
    return(
        <div className="SystemWindow">               
            <Dropdown label="ACTIVE" onSelect={(i) => selectActivePage(i)} type={DropdownType.general} items={["F-PLN", "PERF", "FUEL&LOAD", "WIND", "INIT"]}/>
            <Dropdown label="POSITION" onSelect={(i) => console.log("Selected " + i)} offsetX={25} type={DropdownType.general} items={["MONITOR", "REPORT", "NAVAIDS", "IRS", "GPS"]}/>
            <Dropdown label="SEC INDEX" onSelect={(i) => console.log("Selected " + i)} offsetX={50} type={DropdownType.general} items={["SEC 1", "SEC 2", "SEC 3"]}/>
            <Dropdown label="DATA" onSelect={(i) => console.log("Selected " + i)} offsetX={75} type={DropdownType.general} items={["STATUS", "WAYPOINT", "NAVAID", "ROUTE", "AIRPORT", "PRINTER"]}/>                              
            <div id="fms-header" className="bck-white frnt-grey"><h1>{history.location.pathname.toUpperCase().substring(1)}</h1></div>
                <Switch>
                    {/* ACTIVE */}
                    <Route path='/active/f-pln' 
                        component={() => <FMS_Pages.Active.Fpln stateManager={props.stateManager}/>}>
                    </Route>
                    <Route path='/active/perf' 
                        component={() => <FMS_Pages.Active.Perf/>}>
                    </Route>
                    <Route path='/active/init' 
                        component={() => <FMS_Pages.Active.Init stateManager={props.stateManager} dataManager={props.dataManager}/>}>
                    </Route>
                </Switch>
            <div id="fms-footer"></div>          
        </div>
    );
    
}