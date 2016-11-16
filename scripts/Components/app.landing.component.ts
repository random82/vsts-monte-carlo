import { Component, OnInit } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import * as D3 from 'd3';

@Component({
    selector:'landing',
    templateUrl:'./app.landing.component.html'
})
export class LandingComponent implements OnInit {

    public CompletedWorkItemsCount : number;
    
    public InProgressWorkItemsCount : number;


    constructor(private workItemsService : WorkItemsService){

    }

    ngOnInit() {
        this.workItemsService.getCompletedWorkItems().then((r)=>{
            this.CompletedWorkItemsCount = r.length;
        });

        this.workItemsService.getInProgressWorkItems().then((r)=>{
            this.InProgressWorkItemsCount = r.length;
        });
    }
}