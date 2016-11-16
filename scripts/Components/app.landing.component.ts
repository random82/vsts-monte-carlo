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
        this.CompletedWorkItemsCount = this.workItemsService.getCompletedWorkItems().length;
        this.InProgressWorkItemsCount = this.workItemsService.getInProgressWorkItems().length;
    }
}