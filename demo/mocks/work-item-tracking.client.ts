import { 
    WorkItemTrackingClient
} from '../../scripts/services/work-item-tracking.base';

import {
    WorkItem,
    WorkItemReference
} from '../../scripts/model/workitem';

import * as Q from 'q';

export class MockWorkItemTrackingClient extends WorkItemTrackingClient {
    
    private completedItems: Array<WorkItem>;

    private wipItems: Array<WorkItem>;

    private wipItemRefs: Array<WorkItemReference>;

    private completedItemRefs: Array<WorkItemReference>;

    constructor() {
        super();
        this.completedItems = require('json!../../sample_data/CompletedItems.json').value;
        this.wipItems = require('json!../../sample_data/InProgressItems.json').value;
        this.completedItemRefs = require('json!../../sample_data/CompletedItemRefs.json').value;
        this.wipItemRefs = require('json!../../sample_data/InProgressItemRefs.json').value;
    }

    getInProgressWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        let deferred = Q.defer<Array<WorkItemReference>>();
        deferred.resolve(this.wipItemRefs);
        return deferred.promise;
    }

    getCompletedWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        let deferred = Q.defer<Array<WorkItemReference>>();
        deferred.resolve(this.wipItemRefs);
        return deferred.promise;
    }

    getWorkItems(ids: number[]): Q.Promise<WorkItem[]> {
        let deferred = Q.defer<Array<WorkItem>>();
        deferred.resolve(this.completedItems);
        return deferred.promise;
    }
}