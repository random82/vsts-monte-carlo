import { 
    GetCompletedItemsRef, 
    GetInProgressItemsRef,
    GetWorkItems
} from '../../scripts/Services/work-item-tracking.interfaces';

import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';

export class WorkItemTrackingClient implements GetCompletedItemsRef, GetInProgressItemsRef, GetWorkItems {
    
    private completedItems: any;

    private wipItems: any;

    constructor() {
        this.completedItems = require('json!../../sample_data/CompletedItems.json').value;
        this.wipItems = require('json!../../sample_data/InProgressItems.json').value;
    }

    getInProgressWorkItemRefs(): Q.Promise<TFSContracts.WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    getCompletedWorkItemRefs(): Q.Promise<TFSContracts.WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    getWorkItems(ids: number[]): Q.Promise<TFSContracts.WorkItem[]> {
        throw new Error('Method not implemented.');
    }
}