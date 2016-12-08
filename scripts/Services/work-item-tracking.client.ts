import { Injectable } from '@angular/core';
import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';
import * as RestClient from 'TFS/WorkItemTracking/RestClient';
import * as Q from 'q';

const GET_COMPLETED_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] = 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

const GET_INPROGRESS_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";


Injectable()
export class WorkItemTrackingClient {

    projectId: string;

    constructor(){
        this.projectId = VSS.getWebContext().project.id;
    }

    public getCompletedWorkItemRefs() : Q.Promise<TFSContracts.WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_COMPLETED_WIQL
        };
        
        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getInProgressWorkItemRefs() : Q.Promise<TFSContracts.WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_INPROGRESS_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getWorkItems(ids : Array<number>) : Q.Promise<TFSContracts.WorkItem[]>{
        let client = RestClient.getClient();

        let deferred = Q.defer<Array<TFSContracts.WorkItem>>();

        client.getWorkItems(ids, 
                ["System.Id",
                "System.Links.LinkType",
                "System.WorkItemType",
                "System.Title",
                "System.State",
                "Microsoft.VSTS.Common.BacklogPriority"])
            .then((items)=> {
                deferred.resolve(items);
            },
            (reason) => {
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    public getWorkItemRefsByWIQL(query : TFSContracts.Wiql) : Q.Promise<TFSContracts.WorkItemReference[]> {
        let client = RestClient.getClient();
        let deferred = Q.defer<Array<TFSContracts.WorkItemReference>>();

        client.queryByWiql(query, this.projectId).then(
            (r) => {
                deferred.resolve(r.workItems)
            },
            (reason) => {
                deferred.reject(reason)
            }
        );

        return deferred.promise;
    }
}