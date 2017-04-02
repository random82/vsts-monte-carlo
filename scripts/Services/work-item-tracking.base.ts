import {
    Injectable
} from '@angular/core';

import {
    WorkItemReference,
    WorkItem
} from '../Model/WorkItem';

@Injectable()
export class WorkItemTrackingClient {
    public getInProgressWorkItemRefs(): Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    public getCompletedWorkItemRefs(): Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    public getWorkItems(ids: number[]): Promise<WorkItem[]> {
        throw new Error('Method not implemented.');
    }
}
