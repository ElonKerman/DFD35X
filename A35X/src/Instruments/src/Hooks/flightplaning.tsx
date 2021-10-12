import React, { useContext, useEffect, useState } from 'react';
import { FlightPlanManager } from '../flightplanning/FlightPlanManager';
import { ManagedFlightPlan } from '../flightplanning/ManagedFlightPlan';

import { useSimVar } from './simVars';
import { getRootElement } from './defaults';
import { FMCDataManager } from '../MFD/A35X_FMCDataManager'


export const useFlightPlanManager = (): FlightPlanManager => {
    const [flightPlanManager] = useState(() => new FlightPlanManager(getRootElement()));

    return flightPlanManager;
};
export const useDataManager = (): FMCDataManager => {
    const [dataManager] = useState(() => new FMCDataManager(useContext(FlightPlanContext).flightPlanManager));

    return dataManager;
};
export const FlightPlanContext = React.createContext<{ flightPlanManager: FlightPlanManager }>(undefined as any);

export const FlightPlanProvider: React.FC = ({ children }) => {
    const flightPlanManager = useFlightPlanManager();

    return (
        <FlightPlanContext.Provider value={{ flightPlanManager }}>
            {children}
        </FlightPlanContext.Provider>
    );
};

export const useFlightPlanVersion = (): number => {
    const [version] = useSimVar(FlightPlanManager.FlightPlanVersionKey, 'number');

    return version;
};

export const useCurrentFlightPlan = (): ManagedFlightPlan => {
    const flightPlanManager = useContext(FlightPlanContext).flightPlanManager;

    const flightPlanVersion = useFlightPlanVersion();
    const [currentFlightPlan, setCurrentFlightPlan] = useState<ManagedFlightPlan>(() => flightPlanManager.getCurrentFlightPlan());

    useEffect(() => {
        flightPlanManager.updateFlightPlan(() => {
            setCurrentFlightPlan(flightPlanManager.getCurrentFlightPlan());
        });
    }, [flightPlanVersion]);

    return currentFlightPlan;
};