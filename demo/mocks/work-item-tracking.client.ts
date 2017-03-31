import {
    WorkItemTrackingClient
} from '../../scripts/services/work-item-tracking.base';

import {
    WorkItem,
    WorkItemReference
} from '../../scripts/model/workitem';

export class MockWorkItemTrackingClient extends WorkItemTrackingClient {

    private readonly completedItems: WorkItem[];
    private readonly wipItems: WorkItem[];
    private readonly wipItemRefs: WorkItemReference[];
    private readonly completedItemRefs: WorkItemReference[];

    constructor() {
        super();
        this.completedItems = require('json!../../sample_data/CompletedItems.json').value;
        this.wipItems = require('json!../../sample_data/InProgressItems.json').value;
        this.completedItemRefs = require('json!../../sample_data/CompletedItemRefs.json').workItems;
        this.wipItemRefs = require('json!../../sample_data/InProgressItemRefs.json').workItems;
    }

    getInProgressWorkItemRefs(): Promise<WorkItemReference[]> {
        return Promise.resolve(this.wipItemRefs);
    }

    getCompletedWorkItemRefs(): Promise<WorkItemReference[]> {
        return Promise.resolve(this.completedItemRefs);
    }

    getWorkItems(ids: number[]): Promise<WorkItem[]> {
        return Promise.resolve(this.wipItems);
    }
}