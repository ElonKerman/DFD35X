import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FMCDataManager } from "../../../../../../A35X_FMCDataManager";
import { Dropdown, DropdownType } from "../../../../../../Components/dropdown";
import { MFD_StateManager } from "../../../../../../MFD_StateManager";
import './DepArrPages.scss'

type Arrival_Props ={
    stateManager: MFD_StateManager
}
export const Page = (props: Arrival_Props) =>
{
    const history = useHistory();
    const [airport, setAirport] = useState(String);
    const [runway, setRunway] = useState(String);
    const [star, setStar] = useState(String);
    const [trans, setTrans] = useState(String);
    const [approach, setApproach] = useState(String);
    const [via, setVia] = useState(String);


    const [didLoad, setDidLoad] = useState(false);

    console.log(history.location.pathname);

    useEffect(() => {
        if(!didLoad)
        {
            setDidLoad(true);
            if(props.stateManager.onUpdate.find(() => onUpdate()) == undefined)
                props.stateManager.onUpdate.push(() => onUpdate());
            onUpdate();
        }
    });
    function onUpdate() {
        setAirport(props.stateManager.destination);
        setRunway(FMCDataManager.runwayDesignatorUtil(props.stateManager.arrRunway))
        setStar(props.stateManager.STAR);
        setTrans(props.stateManager.appTransition);
        setApproach(props.stateManager.approach);
        setVia(props.stateManager.via);
    }
    function getRunways(): string[]
    {
        return(props.stateManager.flightPlanManager.getDestination().infos.oneWayRunways.map(a => `${FMCDataManager.runwayDesignatorUtil(a.designation)} ${Math.round(a.length)}M`));
    }
    function getSTARs(): any[]
    {
        if(props.stateManager.arrRunway == '')
            return [];
        var stars = props.stateManager.flightPlanManager.getDestination().infos.arrivals;
        
        var correctStars: any = [];
        var selectedrwy = FMCDataManager.runwayDesignatorUtil(props.stateManager.arrRunway);
        for (let i = 0; i < stars.length; i++) {
            const element = stars[i];
            if(element.runwayTransitions.length)
            {         
                for (let j = 0; j < element.runwayTransitions.length; j++) {
                    const trans = element.runwayTransitions[j];
                    var transname = FMCDataManager.runwayDesignatorUtil(trans.name.slice(2));
                    if (transname == selectedrwy)
                    {
                        correctStars.push(element);
                        break;
                    }    
                }    
            }
            else {
                //add the arrival even if it isn't runway specific
                correctStars.push(element);
            }
        }
        console.log("")
        return(correctStars);
    }
    function getTransitions(): string[]
    {   
        if(props.stateManager.flightPlanManager.getArrivalProcIndex() > -1)
        {
            return(props.stateManager.flightPlanManager.getArrival().enRouteTransitions.map(a => a.name));
        }
        return([""])
    }
    function getApproaches(): string[]
    {
        return(props.stateManager.flightPlanManager.getDestination().infos.approaches.map(a => a.name));
    }
    function getVias(): string[]
    {
        if(props.stateManager.flightPlanManager.getApproachIndex() > -1)
        {
            var transitions = props.stateManager.flightPlanManager.getApproach().transitions;
            var vias: string[] = [];
            transitions.forEach(element => {
                vias.push(element.legs[0].fixIcao.substr(element.legs[0].fixIcao.length - 5));
            });
            return(vias);
        }
        return([])
    }
    function selectRunway(index: number)
    {
        props.stateManager.flightPlanManager.setDestinationRunwayIndex(index).then(() =>
            props.stateManager.updateArrRunway(props.stateManager.flightPlanManager.getDestination().infos.oneWayRunways[index].designation)
        );
    } 
    function selectApproach(index: number)
    {
        props.stateManager.flightPlanManager.setApproachIndex(index).then(() => {    
            props.stateManager.updateArrRunway(props.stateManager.flightPlanManager.getApproachRunway().designation);
            props.stateManager.updateApproach(props.stateManager.flightPlanManager.getApproach().name);
        });        

        props.stateManager.flightPlanManager.setArrivalProcIndex(-1);
        props.stateManager.flightPlanManager.setApproachTransitionIndex(-1);
        props.stateManager.flightPlanManager.setArrivalEnRouteTransitionIndex(-1);

        props.stateManager.updateSTAR('');
        props.stateManager.updateAppTrans('');
        props.stateManager.updateVia('');
    }
    function selectSTAR(index: number)
    {  
        props.stateManager.flightPlanManager.setArrivalEnRouteTransitionIndex(-1);
        props.stateManager.updateAppTrans('');
        if(index < 0)
        {
            props.stateManager.flightPlanManager.setArrivalProcIndex(-1).then(() =>         
                props.stateManager.updateSTAR("")
            );
            return;
        }
        var num = props.stateManager.flightPlanManager.getDestination().infos.arrivals.indexOf(getSTARs()[index])
        props.stateManager.flightPlanManager.setArrivalProcIndex(num).then(() =>         
            props.stateManager.updateSTAR(props.stateManager.flightPlanManager.getArrival().name)
        );
    }
   
    function selectTransition(index: number)
    {
        props.stateManager.flightPlanManager.setArrivalEnRouteTransitionIndex(index).then(() =>
            props.stateManager.updateAppTrans(props.stateManager.flightPlanManager.getArrival().enRouteTransitions[index].name)
        );
    }
    function selectVIA(index: number)
    {
        props.stateManager.flightPlanManager.setApproachTransitionIndex(index).then(()=>
            props.stateManager.updateVia(props.stateManager.flightPlanManager.getApproach().transitions[index].name)
        );
    }
    function LSInfo(): string
    {
        //Incorrect Functionality Fix Later
        if(runway != '')
            return("ICC");
        return("");
    }
    return(
        <div>
            <div style={{width: "98%", height: "29%", top: "12%", left: "1%"}} className="border-box">
                <h3 style={{left: "6%", top: "-6%", backgroundColor: "black"}}>SELECTED ARRIVAL</h3>

                <h3 style={{left: "1%", top: "25%"}}>TO</h3>
                <h3 style={{left: "7.5%", top: "23.5%"}} className="deparr-info-text">{airport}</h3>

                <h3 style={{left: "20%", top: "10%"}}>LS</h3>
                <h3 style={{left: "20%", top: "30%"}} className="deparr-info-text">{LSInfo()}</h3>

                <h3 style={{left: "43%", top: "10%"}}>RWY</h3>
                <h3 style={{left: "43%", top: "30%"}} className="deparr-info-text">{runway == '' ? '---' : runway}</h3>

                <h3 style={{left: "63%", top: "10%"}}>LENGTH</h3>
                <h3 style={{left: "63%", top: "30%"}} className="deparr-info-text">{(props.stateManager.flightPlanManager.getApproachRunway() && airport != '') ? `${Math.round(props.stateManager.flightPlanManager.getApproachRunway().length)}m` : '----'}</h3>

                <h3 style={{left: "83%", top: "10%"}}>CRS</h3>
                <h3 style={{left: "83%", top: "30%"}} className="deparr-info-text">{(props.stateManager.flightPlanManager.getApproachRunway() && airport != '') ? Utils.leadingZeros(Math.round((props.stateManager.flightPlanManager.getApproachRunway().direction)), 3) : '---'}</h3>

                <h3 style={{left: "1%", top: "65%"}}>APPR</h3>  
                <h3 style={{left: "1%", top: "80%"}} className="deparr-info-text">{approach == '' ? '------' : approach.replace(/\s/g,'')}</h3>

                <h3 style={{left: "20%", top: "65%"}}>FREQ/CHAN</h3>
                <h3 style={{left: "20%", top: "80%"}} className="deparr-info-text">{runway == '' ? '---.--' : props.stateManager.flightPlanManager.getApproachNavFrequency()}</h3>

                <h3 style={{left: "43%", top: "65%"}}>VIA</h3>
                <h3 style={{left: "43%", top: "80%"}} className="deparr-info-text">{via == '' ? star == '' ? '------' : 'NONE' : via}</h3>

                <h3 style={{left: "63%", top: "65%"}}>STAR</h3>
                <h3 style={{left: "63%", top: "80%"}} className="deparr-info-text">{star == '' ? approach  == '' ? '------' : 'NONE' : star}</h3>

                <h3 style={{left: "83%", top: "65%"}}>TRANS</h3>
                <h3 style={{left: "83%", top: "80%"}} className="deparr-info-text">{trans == '' ? star == '' ? '------' : 'NONE' : trans}</h3>
            </div>

            <Dropdown disabled={airport == ''} height={"5%"} width="20%" offsetX={0} offsetY={42} label="RWY" onSelect={(index: number) => selectRunway(index)} type={DropdownType.general} items={getRunways()}/>
            <Dropdown disabled={airport == ''} height={"5%"} width="20%" offsetX={20} offsetY={42} label="APPR" onSelect={(index: number) => selectApproach(index)} type={DropdownType.general} items={getApproaches()}/>
            <Dropdown noneOption disabled={approach == '' || getVias().length == 0} height={"5%"} width="20%" offsetX={40} offsetY={42} label="VIA" onSelect={(index: number) => selectVIA(index)} type={DropdownType.general} items={getVias()}/>
            <Dropdown noneOption disabled={approach == ''} height={"5%"} width="20%" offsetX={60} offsetY={42} label="STAR" onSelect={(index: number) => selectSTAR(index)} type={DropdownType.general} items={getSTARs().map(a => a.name)}/>
            <Dropdown noneOption disabled={star == '' || getTransitions().length == 0} height={"5%"} width="20%" offsetX={80} offsetY={42} label="TRANS" onSelect={(index: number) => selectTransition(index)} type={DropdownType.general} items={getTransitions()}/>
        </div>
    );
}


