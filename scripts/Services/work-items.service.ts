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

    private updateTaktTimes(workItems : TFSContracts.WorkItem[]): MonteCarloWorkItem[] {
        let result =  [<MonteCarloWorkItem>{
                _links : workItems[0]._links,
                fields : workItems[0].fields,
                id : workItems[0].id,
                relations : workItems[0].relations,
                rev: workItems[0].rev,
                taktTime: 0
                }]; 
        

        return result.concat(workItems.slice(1).map(function(n, i) { 
            let currItemDate = moment(n.fields[COMPLETED_DATE_FIELD]);
            let nextItemDate = moment(workItems[i].fields[COMPLETED_DATE_FIELD]);
            let TT = Math.ceil(moment.duration(nextItemDate.diff(currItemDate)).asDays());
            return <MonteCarloWorkItem>{
                _links : n._links,
                fields : n.fields,
                id : n.id,
                relations : n.relations,
                rev: n.rev,
                taktTime: TT
            }; 
        }));
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