import React from "react";
import './WaypointData.scss'
import FullWaypoint from "../Assets/FullLegWaypoint.svg";
import UpperLegWaypoint from "../Assets/UpperLegWaypoint.svg";
import LowerLegWaypoint from "../Assets/LowerLegWaypoint.svg";
import NoLegWaypoint from "../Assets/NoLegWaypoint.svg";

type Waypoint_Props =
{
    onClick?: (e?: any) => any,

    top?: string,
    left?: string,
    
    waypointIdent: string,
    timePrediction: string,
    
    speedPred?: string,
    altitudePred?: string,
    
    efob?: string,
    trueWindPred?: string,
    
    showIcon: boolean
    preLeg?: boolean,
    afterLeg?: boolean,

    waypointSelected?: boolean,
}
export const WaypointData = (props: Waypoint_Props) =>
{
    function getWaypointSvg() : string
    {
        if(!props.showIcon)
            return "";
        if(props.preLeg && props.afterLeg)
            return FullWaypoint;
        else if(props.preLeg)
            return UpperLegWaypoint;
        else if(props.afterLeg)
            return LowerLegWaypoint;
        else
            return NoLegWaypoint;
    }
    return(
        <div style={{top: props.top, left: props.left}} className="waypoint-info">
            <h1 onClick={props.onClick} className={(props.waypointSelected ? "bck-grey frnt-white " : "") + "fpln-waypoint-ident"}>{props.waypointIdent}</h1>

            <h2 className={"fpln-waypoint-time-pred"}>{props.timePrediction}</h2>

            <h2 className={"fpln-waypoint-speed-efob"}>{props.speedPred}</h2>
            <h2 className={"fpln-waypoint-speed-efob"}>{props.efob}</h2>

            <h2 className={"fpln-waypoint-alt-wind"}>{props.altitudePred}</h2>
            <h2 className={"fpln-waypoint-alt-wind"}>{props.trueWindPred}</h2>
            
            <img className="waypoint-icon" src={getWaypointSvg()} alt=""/>
        </div>
    );
}