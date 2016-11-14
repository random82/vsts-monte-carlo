import { Injectable } from '@angular/core';
import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';
import * as RestClient from 'TFS/WorkItemTracking/RestClient';

const GET_COMPLETED_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] = 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

const GET_INPROGRESS_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

export interface IWorkItemTrackingClient {
    getCompletedWorkItemRefs() : Array<TFSContracts.WorkItemReference>;
    getInProgressWorkItemRefs() : Array<TFSContracts.WorkItemReference>;
    getWorkItems(ids : Array<number>) : Array<TFSContracts.WorkItem>;
}

Injectable()
export class WorkItemTrackingClient implements IWorkItemTrackingClient{

    public getCompletedWorkItemRefs() : Array<TFSContracts.WorkItemReference>{
        console.log('Boom 2!');
        let wiql = <TFSContracts.Wiql>{
            query: GET_COMPLETED_WIQL
        };
        
        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getInProgressWorkItemRefs() : Array<TFSContracts.WorkItemReference>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_INPROGRESS_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getWorkItems(ids : Array<number>) : Array<TFSContracts.WorkItem>{
        let client = RestClient.getClient();
        let result : Array<TFSContracts.WorkItem>;
        client.getWorkItems(ids, 
                ["System.Id",
                "System.Links.LinkType",
                "System.WorkItemType",
                "System.Title",
                "System.State",
                "Microsoft.VSTS.Common.BacklogPriority"])
            .then((items)=> {
                result = items;
            });
        return result;
    }

    public getWorkItemRefsByWIQL(query : TFSContracts.Wiql) : Array<TFSContracts.WorkItemReference> {
        let client = RestClient.getClient();
        let witRefs : Array<TFSContracts.WorkItemReference>;
        client.queryByWiql(query).then(
            (r) => {
                witRefs = r.workItems;
            },
            () => {

            }
        );

        return witRefs;
    }
}