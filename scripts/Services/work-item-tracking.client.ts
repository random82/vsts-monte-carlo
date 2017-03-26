import { Injectable } from '@angular/core';
import * as TFSContracts from 'TFS/WorkItemTracking/Contracts';
import * as RestClient from 'TFS/WorkItemTracking/RestClient';
import * as Q from 'q';
import {
    GetCompletedItemsRef, 
    GetInProgressItemsRef,
    GetWorkItems
} from './work-item-tracking.interfaces';

import {
    WorkItem,
    WorkItemReference
} from '../Model/WorkItem';

const GET_COMPLETED_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] = 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

const GET_INPROGRESS_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

Injectable()
export class WorkItemTrackingClient implements GetCompletedItemsRef, GetInProgressItemsRef, GetWorkItems {

    projectId: string;

    constructor(){
        this.projectId = VSS.getWebContext().project.id;
    }

    public getCompletedWorkItemRefs() : Q.Promise<WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_COMPLETED_WIQL
        };
        
        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getInProgressWorkItemRefs() : Q.Promise<WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_INPROGRESS_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getWorkItems(ids : Array<number>) : Q.Promise<WorkItem[]>{
        let client = RestClient.getClient();

        let deferred = Q.defer<Array<WorkItem>>();

        client.getWorkItems(ids, 
                ["System.Id",
                "System.Links.LinkType",
                "System.WorkItemType",
                "System.Title",
                "System.State",
                "Microsoft.VSTS.Common.BacklogPriority"])
            .then((items)=> {
                let result = items.map(it => <WorkItem>{
                    _links: it._links,
                    fields: it.fields,
                    id: it.id,
                    relations: it.relations,
                    rev: it.rev,
                    url: it.url               
                });

                deferred.resolve(result);
            },
            (reason) => {
                deferred.reject(reason);
            });
        return deferred.promise;
    }

    public getWorkItemRefsByWIQL(query : TFSContracts.Wiql) : Q.Promise<WorkItemReference[]> {
        let client = RestClient.getClient();
        let deferred = Q.defer<Array<WorkItemReference>>();

        client.queryByWiql(query, this.projectId).then(
            (r) => {
                deferred.resolve(r.workItems);
            },
            (reason) => {
                deferred.reject(reason);
            }
        );

        return deferred.promise;
    }
}