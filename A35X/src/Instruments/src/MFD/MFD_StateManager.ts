import { FlightPlanAsoboSync } from '../flightplanning/FlightPlanAsoboSync';
import { FlightPlanManager } from '../flightplanning/FlightPlanManager';
import { useSimVar } from '../Hooks/simVars';

export class MFD_StateManager
{
    onUpdate: (() => void)[];
    flightPlanManager: FlightPlanManager;

    flightNumber: string;
    origin: string;
    destination: string;
    alternate: string;
    constructor(update:() => void, _flightPlanManager: FlightPlanManager)
    {
        this.onUpdate = [];
        this.onUpdate.push(() => update());
        this.flightPlanManager = _flightPlanManager;
        this.flightNumber = '';
        this.origin = '';
        this.destination = '';
        this.alternate = '';
        this.flightNumber = SimVar.GetSimVarValue("ATC FLIGHT NUMBER", "string");
        FlightPlanAsoboSync.LoadFromGame(this.flightPlanManager).then(() => {
            if(this.flightPlanManager.getOrigin() != undefined && this.flightPlanManager.getDestination() != undefined)
            {
                this.origin = this.flightPlanManager.getOrigin().ident;
                this.destination = this.flightPlanManager.getDestination().ident;
            }
        });
    }    
    updateOrigin(value: string)
    {
        this.origin = value
        this.destination = '';
        this.alternate = '';
        this.onUpdate.forEach(element => {
            element();
        });
    }
    updateDestination(value: string)
    {
        this.destination = value;
        this.onUpdate.forEach(element => {
            element();
        });    
    }
    updateAlternate(value: string)
    {
        this.alternate = value;
        this.onUpdate.forEach(element => {
            element();
        });   
    }
    updateFlightNum(value: string)
    {
        this.flightNumber = value;
        this.onUpdate.forEach(element => {
            element();
        });   
    }
}
 