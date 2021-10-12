import { Page as FmsActiveInit } from './Active/FMS_Init';
import { Page as FmsActiveFpln } from './Active/FlightPlan/FMS_Fpln';
import { Page as FmsActivePerf } from './Active/FMS_Perf';

export const FMS_Pages = {
    Active: {
        Fpln: FmsActiveFpln,
        Perf: FmsActivePerf,
        Init: FmsActiveInit,
    }
};
