import React, { useCallback, useEffect, useRef } from "react";
import { MFD_StateManager } from "../../../../../../MFD_StateManager";
import { FplnWindowType } from "./FplnWindowType";
import './WaypointRev.scss'
import {useClickOutsideListenerRef} from '../../../../../../Components/OutsideClickHook'
import { useHistory } from "react-router";

type FMS_Waypoint_Rev_Props =
{
    waypointName: string,
    selectWindow: (window: FplnWindowType) => void,
    deleteWaypoint: () => void,
    stateManager: MFD_StateManager
}
type revision_props = {
    label?: string,
    onClick: () => void,
    disabled?: boolean,
}
const Revision_Item = (props: revision_props) =>
{
    return(
        <span onClick={props.disabled ? () => null : () => props.onClick()} className={"waypoint-rev-item " + (props.disabled ? "frnt-grey": "frnt-white")}>{props.label}</span>
    );
}
export const Window = (props: FMS_Waypoint_Rev_Props) =>
{
    const history = useHistory();
    const ref = useClickOutsideListenerRef(() => props.selectWindow(FplnWindowType.none));

    return(
        <div ref={ref} className="waypoint-rev-menu bck-dark-grey">
                <Revision_Item onClick={() => null} label="FROM P.POS DIR TO" disabled/>
                <Revision_Item onClick={() => props.selectWindow(FplnWindowType.nextWaypoint)} label="INSERT NEXT WPT"/>
                <Revision_Item onClick={() => props.deleteWaypoint()} label="DELETE *" disabled={props.waypointName.includes(props.stateManager.origin) || props.waypointName.includes(props.stateManager.destination)}/>
                <Revision_Item onClick={() => history.push("/active/f-pln/departure")} label="DEPARTURE" disabled={!props.waypointName.includes(props.stateManager.origin)}/>
                <Revision_Item onClick={() => history.push("/active/f-pln/arrival")} label="ARRIVAL" disabled={!props.waypointName.includes(props.stateManager.destination)}/>
                <Revision_Item onClick={() => null} label="OFFSET" disabled/>
                <Revision_Item onClick={() => null} label="OVERFLY *" disabled/>
                <Revision_Item onClick={() => null} label="HOLD" disabled/> 
                <Revision_Item onClick={() => null} label="AIRWAYS"/>
                <Revision_Item onClick={() => null} label="ENABLE ALTN *" disabled/>
                <Revision_Item onClick={() => null} label="NEW DEST" disabled/>
                <Revision_Item onClick={() => null} label="CONSTRAINTS" disabled/>
                <Revision_Item onClick={() => null} label="CMS" disabled/>
                <Revision_Item onClick={() => null} label="STEP ALTs" disabled/>
                <Revision_Item onClick={() => null} label="WIND" disabled/>
        </div>
    );

}