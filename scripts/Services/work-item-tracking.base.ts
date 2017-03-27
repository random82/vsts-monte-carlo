import {
    Injectable
} from '@angular/core';

import {
    WorkItemReference,
    WorkItem
} from '../Model/WorkItem';

import * as Q from 'q';

@Injectable()
export class WorkItemTrackingClient {
    public getInProgressWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    public getCompletedWorkItemRefs(): Q.Promise<WorkItemReference[]> {
        throw new Error('Method not implemented.');
    }

    public getWorkItems(ids: number[]): Q.Promise<WorkItem[]> {
        throw new Error('Method not implemented.');
    }
}
