import { Injectable } from '@angular/core';
import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';
import * as RestClient from 'TFS/WorkItemTracking/RestClient';

import {
    WorkItemTrackingClient
} from './work-item-tracking.base';

import {
    WorkItem,
    WorkItemReference
} from '../Model/WorkItem';

const GET_COMPLETED_WIQL = `Select [System.Id], [System.Title], [System.State]
From WorkItems
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] = 'Done')
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc`;

const GET_INPROGRESS_WIQL = `Select [System.Id], [System.Title], [System.State]
From WorkItems
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done')
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc`;

Injectable();
export class TFSWorkItemTrackingClient extends WorkItemTrackingClient {

    private readonly projectId: string;

    constructor() {
        super();
        this.projectId = VSS.getWebContext().project.id;
    }

    public getCompletedWorkItemRefs(): Promise<WorkItemReference[]> {
        let wiql: TFSContracts.Wiql = {
            query: GET_COMPLETED_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getInProgressWorkItemRefs(): Promise<WorkItemReference[]> {
        let wiql: TFSContracts.Wiql = {
            query: GET_INPROGRESS_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public async getWorkItems(ids: Array<number>): Promise<WorkItem[]> {

        const fields = [
            "System.Id",
            "System.Links.LinkType",
            "System.WorkItemType",
            "System.Title",
            "System.State",
            "Microsoft.VSTS.Common.BacklogPriority"
        ];

        const data = await RestClient.getClient().getWorkItems(ids, fields);
        const result = data.map(x => <WorkItem>x);

        return result;
    }

    public async getWorkItemRefsByWIQL(query: TFSContracts.Wiql): Promise<WorkItemReference[]> {
        const data = await RestClient.getClient().queryByWiql(query, this.projectId);
        return data.workItems;
    }
}