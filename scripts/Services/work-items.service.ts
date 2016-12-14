import {
    Injectable,
    Inject
} from '@angular/core';
import * as TFSContracts from "TFS/WorkItemTracking/Contracts";
import {
    WorkItemTrackingClient
} from "./work-item-tracking.client";

import {
    MonteCarloWorkItem
} from "../Model/WorkItem";

import * as moment from 'moment';

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";
const COMPLETED_DATE_FIELD = "Microsoft.VSTS.Common.ClosedDate";

import * as Q from 'q';

Injectable();
export class WorkItemsService {
    private witClient: WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient: WorkItemTrackingClient) {
        this.witClient = _witClient;
    }

    public getCompletedWorkItems(): IPromise<MonteCarloWorkItem[]> {
        let deferred = Q.defer<Array<TFSContracts.WorkItem>> ();

        this.witClient.getCompletedWorkItemRefs()
        .then((result) => {
            let ids = result.map(w => w.id);
            this.witClient.getWorkItems(ids).then((r) => {
                let result = r.sort((a, b) => {
                    var aDate = new Date(a.fields[COMPLETED_DATE_FIELD]);
                    var bDate = new Date(b.fields[COMPLETED_DATE_FIELD]);
                    return aDate.valueOf() - bDate.valueOf();
                });
                result = this.updateTaktTimes(result);
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }

    private updateTaktTimes(wis : TFSContracts.WorkItem[]): MonteCarloWorkItem[] {
        return wis.slice(1).map(function(n, i) { 

            var currItemDate = moment(n.fields[COMPLETED_DATE_FIELD]);
            var nextItemDate = moment(wis[i].fields[COMPLETED_DATE_FIELD]);

            return <MonteCarloWorkItem>{
                _links : n._links,
                fields : n.fields,
                id : n.id,
                relations : n.relations,
                rev: n.rev,
                taktTime: 0
                }; 
        });
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