import { Injectable } from '@angular/core';
import { WorkItem, WorkItemReference} from "TFS/WorkItemTracking/Contracts";

import {IWorkItemTrackingClient} from "./work-item-tracking.client";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";

Injectable()
export class WorkItemsService {

    constructor(private witClient : IWorkItemTrackingClient){

    }

    public getCompletedWorkItems() : Array<WorkItem> {
        let witRefs = this.witClient.getCompletedWorkItemRefs();
        let ids = witRefs.map(w => w.id);
        return this.witClient.getWorkItems(ids).sort((a, b) => {
            return a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD]
        });        
    }    
}