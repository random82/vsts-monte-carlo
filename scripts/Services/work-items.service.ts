import { Injectable, Inject } from '@angular/core';
import * as TFSContracts from "TFS/WorkItemTracking/Contracts";
import {WorkItemTrackingClient} from "./work-item-tracking.client";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";

import * as Q from 'q';

Injectable();
export class WorkItemsService {

    private witClient : WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient : WorkItemTrackingClient){
        console.log('Boom!');
        this.witClient = _witClient;
    }

    public getCompletedWorkItems() : IPromise<TFSContracts.WorkItem[]> {
        let deferred = Q.defer<Array<TFSContracts.WorkItem>>();

        let ids : number[];
        
        this.witClient.getCompletedWorkItemRefs()
             .then((result) => {
                 ids = result.map(w => w.id);
             });        
        
        this.witClient.getWorkItems(ids).then((r) => {
            let result = r.sort((a, b) => {
                return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
                 });
            deferred.resolve(result);
        });

        return deferred.promise;       
    }

    public getInProgressWorkItems() : IPromise<TFSContracts.WorkItem[]> {
        let deferred = Q.defer<Array<TFSContracts.WorkItem>>();

        let ids : number[];
        
        this.witClient.getInProgressWorkItemRefs()
             .then((result) => {
                 ids = result.map(w => w.id);
             });        
        
        this.witClient.getWorkItems(ids).then((r) => {
            let result = r.sort((a, b) => {
                return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
                 });
            deferred.resolve(result);
        });

        return deferred.promise;            
    }
}