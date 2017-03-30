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

const GET_COMPLETED_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] = 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

const GET_INPROGRESS_WIQL = "Select [System.Id], [System.Title], [System.State] \
From WorkItems \
Where ([System.TeamProject] = @project AND  [System.WorkItemType] IN GROUP 'Microsoft.RequirementCategory'  AND  [System.State] <> 'Done') \
order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc";

Injectable();
export class TFSWorkItemTrackingClient extends WorkItemTrackingClient {

    projectId: string;

    constructor(){
        super();
        this.projectId = VSS.getWebContext().project.id;
    }

    public getCompletedWorkItemRefs() : Promise<WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_COMPLETED_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getInProgressWorkItemRefs() : Promise<WorkItemReference[]>{
        let wiql = <TFSContracts.Wiql>{
            query: GET_INPROGRESS_WIQL
        };

        return this.getWorkItemRefsByWIQL(wiql);
    }

    public getWorkItems(ids : Array<number>) : Promise<WorkItem[]>{
        return new Promise<WorkItem[]>((resolve, reject) => {
            let client = RestClient.getClient();
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

                    resolve(result);
                },
                (reason) => {
                    reject(reason);
            });
        });
    }

    public getWorkItemRefsByWIQL(query : TFSContracts.Wiql) : Promise<WorkItemReference[]> {
        return new Promise<WorkItemReference[]>((resolve, reject) => {            
            let client = RestClient.getClient();
            client.queryByWiql(query, this.projectId).then(
                (r) => {
                    resolve(r.workItems);
                },
                (reason) => {
                    reject(reason);
                }
            );
        });
    }
}