import { Injectable } from '@angular/core';
import { WorkItem, WorkItemReference, Wiql } from "TFS/WorkItemTracking/Contracts";
import * as RestClient from "TFS/WorkItemTracking/RestClient";

const GET_COMPLETED_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

export interface IWorkItemTrackingClient {
    getCompletedWorkItemRefs() : Array<WorkItemReference>;
    getWorkItems(ids : Array<number>) : Array<WorkItem>;
}

Injectable()
export class WorkItemTrackingClient implements IWorkItemTrackingClient{

    public getCompletedWorkItemRefs() : Array<WorkItemReference>{
        let wiql = <Wiql>{
            query: GET_COMPLETED_WIQL
        }

        let client = RestClient.getClient();
        let witRefs : Array<WorkItemReference>;
        client.queryByWiql(wiql).then(
            (r) => {
                witRefs = r.workItems
            },
            () => {

            }
        );

        return witRefs;
    }

    public getWorkItems(ids : Array<number>) : Array<WorkItem>{
        let client = RestClient.getClient();
        let result : Array<WorkItem>;
        client.getWorkItems(ids, 
                ["System.Id",
                "System.Links.LinkType",
                "System.WorkItemType",
                "System.Title",
                "System.State"])
            .then((items)=> {
                result = items
            });
        return result;
    }
}