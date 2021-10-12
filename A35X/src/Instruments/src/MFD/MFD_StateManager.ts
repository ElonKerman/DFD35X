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

    depRunway: string;
    SID: string;
    depTransition: string;

    arrRunway: string;
    STAR: string;
    approach: string;
    appTransition: string;
    via: string;

    constructor(update:() => void, _flightPlanManager: FlightPlanManager)
    {
        this.onUpdate = [];
        this.onUpdate.push(() => update());
        this.flightPlanManager = _flightPlanManager;

        this.flightNumber = '';

        this.origin = '';
        this.destination = '';
        this.alternate = '';

        this.depRunway = '';
        this.SID = '';
        this.depTransition = '';
        
        this.arrRunway = '';
        this.STAR = '';
        this.approach = '';
        this.appTransition = '';
        this.via = '';

        
        this.flightNumber = SimVar.GetSimVarValue("ATC FLIGHT NUMBER", "string");
        FlightPlanAsoboSync.LoadFromGame(this.flightPlanManager).then(() => {
            if(this.flightPlanManager.getOrigin() != undefined && this.flightPlanManager.getDestination() != undefined)
            {
                this.origin = this.flightPlanManager.getOrigin().ident;
                this.destination = this.flightPlanManager.getDestination().ident;

                
                this.depRunway = this.flightPlanManager.getDepartureRunway().designation;
                var depProc = this.flightPlanManager.getDeparture();
                if(depProc)
                {
                    this.SID = depProc.name;
                    if(this.SID != '')
                        this.depTransition = depProc.enRouteTransitions[this.flightPlanManager.getDepartureEnRouteTransitionIndex()].name;
                }
                
                this.arrRunway = this.flightPlanManager.getApproachRunway().designation;
                var arrProc = this.flightPlanManager.getArrival();
                if(arrProc)
                {
                    this.STAR = arrProc.name;
                    this.approach = this.flightPlanManager.getApproach().name;
                    if(this.SID != '')
                    {
                        var trans = this.flightPlanManager.getApproach().transitions[this.flightPlanManager.getApproachTransitionIndex()]
                        this.via = trans.waypoints[0].infos.icao.substr(7); 
                        this.appTransition = arrProc.enRouteTransitions[this.flightPlanManager.getArrivalTransitionIndex()];
                    }
                }


                this.updateAll();
            }
        });
    }    
    updateAll()
    {
        this.onUpdate.forEach(element => {
            element();
        });
    }
    updateOrigin(value: string)
    {
        this.origin = value
        this.destination = '';
        this.alternate = '';
        this.depRunway = '';
        this.SID = '';
        this.depTransition = '';
        this.updateAll();
    }
    updateDestination(value: string)
    {
        this.destination = value;
        this.alternate = '';
        this.arrRunway = '';
        this.approach = '';
        this.STAR = '';
        this.appTransition = '';
        this.via = '';
        this.updateAll();  
    }
    updateAlternate(value: string)
    {
        this.alternate = value;
        this.updateAll();  
    }
    updateFlightNum(value: string)
    {
        this.flightNumber = value;
        this.updateAll();
    }
    updateDepRunway(value: string)
    {
        this.depRunway = value;
        this.SID = '';
        this.depTransition = '';
        this.updateAll();
    }
    updateSID(value: string)
    {
        this.SID = value;
        this.depTransition = '';
        this.updateAll();
    }
    updateDepTrans(value: string)
    {
        this.depTransition = value;
        this.updateAll();
    }

    updateArrRunway(value: string)
    {
        this.arrRunway = value;
        this.updateAll();
    }
    updateSTAR(value: string)
    {
        this.STAR = value;
        this.appTransition = '';
        this.updateAll();
    }
    updateAppTrans(value: string)
    {
        this.appTransition = value;
        this.updateAll();
    }
    updateApproach(value: string)
    {
        this.approach = value;
        this.updateAll();
    } 
    updateVia(value: string)
    {
        this.via = value;
        this.updateAll();
    }
}
 