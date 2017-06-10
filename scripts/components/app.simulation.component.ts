import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';
import { SimulationService } from '../services/simulation.service';

import { WorkItem } from '../Model/WorkItem';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

@Component({
    selector:'simulation',
    templateUrl:'./app.simulation.component.html'
})
export class SimulationComponent implements OnInit{

    el: HTMLElement;

    public CompletedWorkItems : WorkItem[];

    public CompletedWorkItemsCount : number;

    public InProgressWorkItems: WorkItem[];
    
    public InProgressWorkItemsCount : number;

    public NumberOfIterations: number;

    public ShowItemCount: boolean;

    constructor(private workItemsService : WorkItemsService,
                private simulationService : SimulationService,
                private zone : NgZone,
                private elementRef: ElementRef){
        this.CompletedWorkItemsCount = 0;
        this.InProgressWorkItemsCount = 0;
        this.ShowItemCount = false;
        this.el = elementRef.nativeElement;
        this.simulationService.setup({
            iterations: 1000,
            sprintLength: 5
        });
    }

    ngOnInit() {
        let calls = [
            this.workItemsService.getCompletedWorkItems(), 
            this.workItemsService.getInProgressWorkItems()
        ];
        Promise.all(calls).then((r)=>{
            this.zone.run(() => {
                this.CompletedWorkItems = r[0];
                this.CompletedWorkItemsCount = r[0].length;
                this.InProgressWorkItems = r[1];
                this.InProgressWorkItemsCount = r[1].length;
                this.ShowItemCount = true;
            }); 

            let sprintLengths = [5, 5, 4, 5, 5, 5, 4];
            let taktTimes = this.CompletedWorkItems.map(d => d.taktTime);
            let simulatedTT = this.simulationService.run(taktTimes, this.InProgressWorkItemsCount, 1000);
            let probabilities = this.simulationService.runSprintSimulations(simulatedTT, sprintLengths);
            let forecast = this.InProgressWorkItems.map((it, idx) =>
            {
                return [it.id, it.fields["System.Title"]].concat(probabilities[idx]);
            });
            this.drawForecastMtx(forecast);           
        });
    } 

    drawForecastMtx(forecast: any[]) {
        let heatmapColour = scaleLinear()
          .domain([0, 0.2, 0.5, 0.8, 1])
          .range(["red", "orange", "yellow" , "#05ff00", "#00c000"]);
              
        let tr = select(this.el)
            .select('#forecast-matrix')
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