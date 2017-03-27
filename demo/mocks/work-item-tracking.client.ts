import { 
    WorkItemTrackingClient
} from '../../scripts/Services/work-item-tracking.base';

import {
    WorkItem,
    WorkItemReference
} from '../../scripts/Model/WorkItem';

import * as Q from 'q';

export class MockWorkItemTrackingClient extends WorkItemTrackingClient {
    
    private completedItems: any;

    private wipItems: any;

    constructor() {
        super();
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