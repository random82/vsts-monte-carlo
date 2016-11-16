import { Injectable, Inject } from '@angular/core';
import * as TFSContracts from "TFS/WorkItemTracking/Contracts";
import {WorkItemTrackingClient} from "./work-item-tracking.client";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";

Injectable();
export class WorkItemsService {

    private witClient : WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient : WorkItemTrackingClient){
        console.log('Boom!');
        this.witClient = _witClient;
    }

    public getCompletedWorkItems() : Array<TFSContracts.WorkItem> {
        let witRefs = this.witClient.getCompletedWorkItemRefs();
        
        let ids = witRefs.map(w => w.id);
        return this.witClient.getWorkItems(ids).sort((a, b) => {
            return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
        });        
    }

    public getInProgressWorkItems() : Array<TFSContracts.WorkItem> {
        let witRefs = this.witClient.getInProgressWorkItemRefs();
        let ids = witRefs.map(w => w.id);
        return this.witClient.getWorkItems(ids).sort((a, b) => {
            return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD];
        });        
    }
}