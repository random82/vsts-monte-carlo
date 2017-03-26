import { 
    GetCompletedItemsRef, 
    GetInProgressItemsRef,
    GetWorkItems
} from '../../scripts/Services/work-item-tracking.interfaces';

import {
    WorkItem,
    WorkItemReference
} from '../../scripts/Model/WorkItem'

export class WorkItemTrackingClient implements GetCompletedItemsRef, GetInProgressItemsRef, GetWorkItems {
    
    private completedItems: any;

    private wipItems: any;

    constructor() {
        this.completedItems = require('json!../../sample_data/CompletedItems.json').value;
        this.wipItems = require('json!../../sample_data/InProgressItems.json').value;
    }

    getInProgressWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    getCompletedWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    getWorkItems(ids: number[]): Q.Promise<WorkItem[]> {
        throw new Error('Method not implemented.');
    }
}