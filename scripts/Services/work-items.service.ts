import {
    Injectable,
    Inject
} from '@angular/core';

import {
    WorkItemTrackingClient
} from "./work-item-tracking.client";

import {
    WorkItem
} from "../Model/WorkItem";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";
const COMPLETED_DATE_FIELD = "Microsoft.VSTS.Common.ClosedDate";

import * as Q from 'q';

Injectable();
export class WorkItemsService {
    private witClient: WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient: WorkItemTrackingClient) {
        this.witClient = _witClient;
    }

    public getInProgressWorkItems(): IPromise <WorkItem[]> {
        let deferred = Q.defer <Array<WorkItem>> ();

        this.witClient.getInProgressWorkItemRefs()
        .then((result) => {
            let ids = result.map(w => w.id);
            this.witClient.getWorkItems(ids).then((r) => {
                let result = r.sort((a, b) => {
                    return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
                });

                result = result.map(it => {
                    return  <WorkItem>{
                        _links : it._links,
                        fields : it.fields,
                        id : it.id,
                        relations : it.relations,
                        rev: it.rev,
                        url: it.url,
                        taktTime: 0
                    }; 
                });

                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }

    public getCompletedWorkItems(): IPromise<WorkItem[]> {
        let deferred = Q.defer<Array<WorkItem>> ();

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

    private updateTaktTimes(workItems : WorkItem[]): WorkItem[] {
        let self = this;

        let result =  [<WorkItem>{
                _links : workItems[0]._links,
                fields : workItems[0].fields,
                id : workItems[0].id,
                relations : workItems[0].relations,
                rev: workItems[0].rev,
                taktTime: 0
                }];        

        return result.concat(workItems.slice(1).map(function(n, i) { 
            let TT =  self.dateDiff(workItems[i], n, COMPLETED_DATE_FIELD);

            return <WorkItem>{
                _links : n._links,
                fields : n.fields,
                id : n.id,
                relations : n.relations,
                rev: n.rev,
                url: n.url,
                taktTime: TT
            }; 
        }));
    }

    private dateDiff(a:WorkItem, b:WorkItem, fieldName : string) : number {
        let first = new Date(a.fields[fieldName]);
        let second = new Date(b.fields[fieldName]);
                 
        var one = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var two = new Date(second.getFullYear(), second.getMonth(), second.getDate());

         // Do the math.
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = two.getTime() - one.getTime();
        var days = millisBetween / millisecondsPerDay;

        // Round down.
        return Math.floor(days);
    }

   
}