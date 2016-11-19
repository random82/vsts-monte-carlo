import { Component, OnInit, NgZone } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import * as D3 from 'd3';

@Component({
    selector:'landing',
    templateUrl:'./app.landing.component.html'
})
export class LandingComponent implements OnInit {

    public CompletedWorkItemsCount : number;
    
    public InProgressWorkItemsCount : number;

    constructor(private workItemsService : WorkItemsService, private zone : NgZone){
        this.CompletedWorkItemsCount = 0;
        this.InProgressWorkItemsCount = 0;
    }

    ngOnInit() {
        this.workItemsService.getCompletedWorkItems().then((r)=>{
            this.zone.run(() => {
                this.CompletedWorkItemsCount = r.length;
            });            
        });

        this.workItemsService.getInProgressWorkItems().then((r)=>{
            this.zone.run(() => {
                this.InProgressWorkItemsCount = r.length;
            }); 
        });
    }
}