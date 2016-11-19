import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

@Component({
    selector:'landing',
    templateUrl:'./app.landing.component.html'
})
export class LandingComponent implements OnInit {

    el: HTMLElement;

    public CompletedWorkItemsCount : number;
    
    public InProgressWorkItemsCount : number;

    constructor(private workItemsService : WorkItemsService, 
                private zone : NgZone,
                private elementRef: ElementRef){
        this.CompletedWorkItemsCount = 0;
        this.InProgressWorkItemsCount = 0;
        this.el = elementRef.nativeElement;
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

        this.drawForecastMtx();
    }

    drawForecastMtx() {
        let heatmapColour = scaleLinear()
          .domain([0, 0.2, 0.5, 0.8, 1])
          .range(["red", "orange", "yellow" , "#05ff00", "#00c000"]);
          
       
        let forecast = [
            [1.0, 1.0, 1.0, 1.0, 1.0],
            [0.9, 1.0, 1.0, 1.0, 1.0],
            [0.7, 0.9, 1.0, 1.0, 1.0],
            [0.5, 0.8, 0.9, 1.0, 1.0],
            [0.2, 0.6, 0.7, 0.8, 0.9],
            [0.13, 0.4, 0.48, 0.56, 0.7],
            [0.1, 0.2, 0.25, 0.3, 0.4]
        ];
               
        let tr = select(this.el)
            .select('#forecast_matrix')
            .append('table')
            .append('tbody')
            .selectAll('tr')
            .data(forecast)
            .enter()
            .append('tr');          
          
        let td = tr.selectAll('td')
            .data((d:any, i:any) => { return d; })
            .enter()
            .append('td');
        
        td.text((d: any) => { return Math.floor(d * 100) + '%'; });
        td.style("background-color", 
            (d) => {
                return <any>heatmapColour(d);
            }
        );
    }
}