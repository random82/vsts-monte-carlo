import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import { MonteCarloWorkItem } from '../Model/WorkItem';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

@Component({
    selector:'landing',
    templateUrl:'./app.landing.component.html'
})
export class LandingComponent implements OnInit {

    el: HTMLElement;

    public CompletedWorkItems : MonteCarloWorkItem[];

    public CompletedWorkItemsCount : number;

    public InProgressWorkItems: MonteCarloWorkItem[];
    
    public InProgressWorkItemsCount : number;

    public NumberOfIterations: number;

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
                this.CompletedWorkItems = r;
                this.CompletedWorkItemsCount = r.length;
            });            
        });

        this.workItemsService.getInProgressWorkItems().then((r)=>{
            this.zone.run(() => {
                this.InProgressWorkItems = r;
                this.InProgressWorkItemsCount = r.length;
            }); 
        });

        this.drawForecastMtx();
    }

    drawForecastMtx() {
        let heatmapColour = scaleLinear()
          .domain([0, 0.2, 0.5, 0.8, 1])
          .range(["red", "orange", "yellow" , "#05ff00", "#00c000"]);
          
        let forecast = this.InProgressWorkItems.map((it) => {
            return [it.id, it.fields["System.Title"], 0.7, 0.9, 1.0, 1.0, 1.0]
        });        
       
               
        let tr = select(this.el)
            .select('#forecast_matrix')
            .append('table')
            .append('tbody')
            .selectAll('tr')
            .data(forecast)
            .enter()
            .append('tr');          
          
        let td = tr.selectAll('td')
            .data((d:any, i:number) => { return d; })
            .enter()
            .append('td');
        
        td.text((d: any, i:number) => { 
            if(i < 2){
                return d;
            }
            return Math.floor(d * 100) + '%'; }
        );
        td.style("background-color", 
            (d, i) => {
                if(i < 2) {
                    return "white";
                }
                return <any>heatmapColour(d);
            }
        );
    }
}