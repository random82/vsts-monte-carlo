import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';

export interface WorkItem extends TFSContracts.WorkItem {
    taktTime : number;
}

export interface WorkItemReference extends TFSContracts.WorkItemReference {

}