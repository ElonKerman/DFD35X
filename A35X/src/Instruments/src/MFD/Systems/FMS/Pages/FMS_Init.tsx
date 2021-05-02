import { useEffect, useState } from "react"
import React from 'react'
import './FMS_init.scss'
import {Input} from '../../../Components/input'
import { Button } from '../../../Components/button';
import {Dropdown, DropdownType} from '../../../Components/dropdown'
import { FlightPlanManager } from '../../../../flightplanning/FlightPlanManager'
import {FlightPlanAsoboSync} from '../../../../flightplanning/FlightPlanAsoboSync'
import { FMCDataManager } from "../../../A35X_FMCDataManager";
import { MFD_StateManager } from "../../../MFD_StateManager";

export enum ClimbMode
{
    Econ,
} 
type Init_Props =
{
    dataManager: FMCDataManager,
    stateManager: MFD_StateManager
}
export const FMS_Init = (props: Init_Props) =>
{   
    const row1Y: number = 1.5
    const row2Y: number = 9
    const row3Y: number = 16
    const row4Y: number = 23
    const row5Y: number = 33
    const row6Y: number = 40
    const row7Y: number = 48
    const row8Y: number = 55
    
    const maxFlightLevel = 400;    

    const [origin, setOrigin] = useState(String);
    const [destination, setDestination] = useState(String);
    const [alternate, setAlternate] = useState(String);
    const [flightNum, setFlightNum] = useState(String);

    const [didLoad, setDidLoad] = useState(false);
    
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
        setOrigin(props.stateManager.origin);
        setDestination(props.stateManager.destination);
        setAlternate(props.stateManager.alternate);
        setFlightNum(props.stateManager.flightNumber);
    }
    function tryUpdateOrigin(value: string)
    {
        console.log("Setting Origin to: " + value);
        setOrigin(value.toUpperCase());
        props.dataManager.GetAirportByIdent(value).then((airport) => {
            if(airport)
            {
                props.dataManager.flightPlanManager.setOrigin(airport.icao);
                props.stateManager.updateOrigin(value)
            }
        });   
        if(value.length == 0)
            props.stateManager.updateOrigin("");
    }
    function trySetDestination(value: string)
    {
        setDestination(value.toUpperCase());
        props.dataManager.GetAirportByIdent(value).then((airport) => {
            if(airport)
            {
                props.dataManager.flightPlanManager.setDestination(airport.icao);
                props.stateManager.updateDestination(value)
            }
        });  
        if(value.length == 0)
            props.stateManager.updateDestination(""); 
    }
    function trySetAlternate(value: string)
    {
        setAlternate(value.toUpperCase());
        props.dataManager.GetAirportByIdent(value).then((airport) => {
            if(airport)
            {
                props.stateManager.updateAlternate(value)
            }
        });   
        if(value.length == 0)
            props.stateManager.updateAlternate("");
    }
    function trySetFlightNum(value: string)
    {
        setFlightNum(value.toUpperCase());
        SimVar.SetSimVarValue("ATC FLIGHT NUMBER", "string", value)
        props.stateManager.updateFlightNum(value);
    }
    return(
        <div className="fms-page">
            <Input value={flightNum} onChange={(value) => trySetFlightNum(value)} characterLimit={10} className="large-input" posX={18.5} posY={row1Y} type="text"></Input>
            <Button className="large-button" posX={50} posY={row1Y}>ACFT STATUS</Button>

            <Button disabled className="medium-tall-button" posX={77} posY={row1Y - 1}>CPNY F-PLN REQUEST</Button>
            
            <h2 style={{top: row2Y + "%"}}>FROM</h2>
            <Input value={origin} onChange={(value) => tryUpdateOrigin(value)} characterLimit={4} className="small-input" posX={18.5} posY={row2Y} type="text"></Input>
            
            <h2 style={{top: row2Y + "%", right: "63%"}}>TO</h2>
            <Input value={destination} onChange={(value) => trySetDestination(value)} characterLimit={4} className="small-input" posX={38} posY={row2Y} type="text"></Input>
            
            <h2 style={{top: row2Y + "%", right: "39%"}}>ALTN</h2>
            <Input placeHolder="NONE" value={alternate} disabled={props.stateManager.destination == ""} onChange={(value) => trySetAlternate(value)} characterLimit={4} className="small-input" posX={62} posY={row2Y} type="text"></Input>

            <h2 style={{top: row3Y + "%"}}>CPNY RTE</h2>
            <Input disabled onChange={(value) => console.log("Updated Company Route: " + value)} characterLimit={10} className="large-input" posX={18.5} posY={row3Y} type="text"></Input>
            <Button disabled className="large-button" posX={50} posY={row3Y}>RTE SEL</Button>

            <h2 style={{top: row4Y + "%"}}>ALTN RTE</h2>
            <Input disabled onChange={(value) => console.log("Update Alternate Route: " + value)} characterLimit={10} className="large-input" posX={18.5} posY={row4Y} type="text"></Input>
            <Button disabled className="large-button" posX={50} posY={row4Y}>ALTN RTE SEL</Button>

            <div style={{top: "31%"}} className="pagesplitter"></div>

            
            <h2 style={{top: row5Y + "%"}}>CRZ FL</h2>    
            <Input disabled onChange={(value) => props.dataManager.trySetCruiseFlightLevel(value)} characterLimit={5} className="medium-input" posX={18.5} posY={row5Y} type="text"></Input>
            <h2 style={{top: row5Y + "%", right: "38%"}}>CRZ TEMP</h2>    
            <Input disabled onChange={(value) => props.dataManager.trySetCruiseTemp(value)} characterLimit={4} className="medium-input" posX={64} posY={row5Y} type="text"></Input>

            <h2 style={{top: row6Y + "%"}}>MODE</h2>    
            <Dropdown className="mode-dropdown" innerColor="$grey" offsetX={18.5} offseY={row6Y} type={DropdownType.system_select} onSelect={(index) => props.dataManager.trySetClimbMode(index)} items={["ECON", "LRC"]}></Dropdown>
            <h2 style={{top: row6Y + "%", right: "38%"}}>TROPO</h2>    
            <Input onChange={(value) => props.dataManager.trySetTropo(value)} characterLimit={5} value={36090} className="less-large-input" posX={64} posY={row6Y} type="text"></Input>


            <h2 style={{top: row7Y + "%"}}>CI</h2>
            <Input disabled onChange={(value) => null} characterLimit={3} className="small-input" posX={18.5} posY={row7Y} type="text"></Input>

            <h2 style={{top: row8Y + "%"}}>TRIP WIND</h2>
            <Input disabled onChange={(value) => null} characterLimit={5} className="medium-input" posX={18.5} posY={row8Y} type="text"></Input>
            <Button className="small-button" posX={48} posY={row8Y + 0.3}>WIND</Button>
            
            <div style={{top: "63%"}} className="pagesplitter"></div>
 
            <Button className="medium-button" posX={18.5} posY={67}>IRS</Button>
            <Button disabled className="medium-button" posX={18.5} posY={75}>DEPARTURE</Button>
            <Button className="large-button" posX={48} posY={75}>RTE SUMMARY</Button>

            <Button className="medium-button" posX={18.5} posY={83}>NAVAIDS</Button>
            <Button className="medium-button" posX={18.5} posY={91}>FUEL&LOAD</Button>

            <Button className="small-tall-button" posX={0} posY={100}>CLEAR<br/>Info</Button>
        </div>
    );
}