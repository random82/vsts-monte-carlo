import { Injectable } from '@angular/core';
import { WorkItem, WorkItemReference} from "TFS/WorkItemTracking/Contracts";

import {IWorkItemTrackingClient} from "./work-item-tracking.client";



Injectable()
export class WorkItemsService {

    constructor(private witClient : IWorkItemTrackingClient){

    }

    public getCompletedWorkItems() : Array<WorkItem> {
        let witRefs = this.witClient.getCompletedWorkItemRefs();
        let ids = witRefs.map(w => w.id);
        return this.witClient.getWorkItems(ids);        
    }    
}