import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';

export interface MonteCarloWorkItem extends TFSContracts.WorkItem {
    taktTime : number;
}