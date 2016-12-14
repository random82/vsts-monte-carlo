import {
    Injectable,
    Inject
} from '@angular/core';
import * as TFSContracts from "TFS/WorkItemTracking/Contracts";
import {
    WorkItemTrackingClient
} from "./work-item-tracking.client";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";
const COMPLETED_DATE_FIELD = "Microsoft.VSTS.Common.ClosedDate";

import * as Q from 'q';

Injectable();
export class WorkItemsService {
    private witClient: WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient: WorkItemTrackingClient) {
        this.witClient = _witClient;
    }

    public getCompletedWorkItems(): IPromise<TFSContracts.WorkItem[]> {
        let deferred = Q.defer<Array<TFSContracts.WorkItem>> ();

        this.witClient.getCompletedWorkItemRefs()
        .then((result) => {
            let ids = result.map(w => w.id);
            this.witClient.getWorkItems(ids).then((r) => {
                let result = r.sort((a, b) => {
                    return new Date(a.fields[COMPLETED_DATE_FIELD]) - new Date(b.fields[COMPLETED_DATE_FIELD]);
                });
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }

    public getInProgressWorkItems(): IPromise <TFSContracts.WorkItem[]> {
        let deferred = Q.defer <Array<TFSContracts.WorkItem>> ();

        this.witClient.getInProgressWorkItemRefs()
        .then((result) => {
            let ids = result.map(w => w.id);
            this.witClient.getWorkItems(ids).then((r) => {
                let result = r.sort((a, b) => {
                    return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
                });
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }
}