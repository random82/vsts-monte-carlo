import {
    Injectable,
    Inject
} from '@angular/core';

import {
    WorkItemTrackingClient
} from "./work-item-tracking.base";

import {
    WorkItem
} from "../Model/WorkItem";

const BACKLOG_PRIORITY_FIELD = "Microsoft.VSTS.Common.BacklogPriority";
const COMPLETED_DATE_FIELD = "Microsoft.VSTS.Common.ClosedDate";

Injectable();
export class WorkItemsService {
    private witClient: WorkItemTrackingClient;

    constructor(@Inject(WorkItemTrackingClient) _witClient: WorkItemTrackingClient) {
        this.witClient = _witClient;
    }

    public async getInProgressWorkItems(): Promise<WorkItem[]> {

        const inProgressItemRefs = await this.witClient.getInProgressWorkItemRefs();
        const ids = inProgressItemRefs.map(x => x.id);
        const workItems = await this.witClient.getWorkItems(ids);

        const result = workItems
            .sort((a, b) => a.fields[BACKLOG_PRIORITY_FIELD] - b.fields[BACKLOG_PRIORITY_FIELD])
            .map(x => {
                return {
                    ...x,
                    taktTime: 0
                };
            });

        return result;
    }

    public async getCompletedWorkItems(): Promise<WorkItem[]> {

        const completedWorkItemRefs = await this.witClient.getCompletedWorkItemRefs();
        const ids = completedWorkItemRefs.map(x => x.id);
        const workItems = await this.witClient.getWorkItems(ids);

        const sortedWorkItems = workItems.sort((a, b) => {
            const aDate = new Date(a.fields[COMPLETED_DATE_FIELD]);
            const bDate = new Date(b.fields[COMPLETED_DATE_FIELD]);

            return aDate.valueOf() - bDate.valueOf();
        });

        const result = this.updateTaktTimes(sortedWorkItems);

        return result;
    }

    private updateTaktTimes(workItems : WorkItem[]): WorkItem[] {

        return workItems.map((x, index) => {
            const taktTime = index === 0
                ? 0
                : this.dateDiff(workItems[index - 1], x, COMPLETED_DATE_FIELD);

            return {
                ...x,
                taktTime
            };
        });
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