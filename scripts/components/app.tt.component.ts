import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import { WorkItem } from '../Model/WorkItem';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { range, histogram, max } from 'd3-array';
import { format } from 'd3-format';
import { randomBates } from 'd3-random';
import { axisBottom } from 'd3-axis';


@Component({
    selector:'takt-time',
    templateUrl:'./app.tt.component.html'
})
export class TaktTimeComponent implements OnInit {

    el: HTMLElement;

    public CompletedWorkItems : WorkItem[];

    constructor(private workItemsService:WorkItemsService,
                private zone : NgZone,
                private elementRef: ElementRef){
        this.el = elementRef.nativeElement;

    }

    ngOnInit(): void {
        this.workItemsService.getCompletedWorkItems().then((r)=>{
            this.zone.run(() => {
                this.CompletedWorkItems = r;
            });
            this.drawHistogram();
        });
    }

    drawHistogram(){
        if(!this.CompletedWorkItems){
            return;
        }

        let data = this.CompletedWorkItems.map(d => d.taktTime);

        let formatCount = format(",.0f");

        let hist = select(this.el).select('#tt-hist');
        let margin = {top: 10, right: 30, bottom: 50, left: 30};
        let width = +hist.attr("width") - margin.left - margin.right;
        let height = +hist.attr("height") - margin.top - margin.bottom;
        let g = hist
                .append("g")
                .attr("transform", "translate(" + (-margin.left) + "," + margin.top + ")");

        let x = scaleLinear<number>()
            .domain([-0.5, max(data)+1.5])
            .rangeRound([0, width]);
     
        let generator = histogram<number>()
            .domain(d => x.domain())
            .thresholds(x.ticks(max(data)));
            
        let bins = generator(data);

        let y = scaleLinear<number>()
            .domain([0, max(bins, d => d.length)])
            .range([height, 0]);

        let barWidth = 2*(x(bins[0].x1) - x(bins[0].x0) - 1);

        let bar = g.selectAll(".bar")
            .data(bins)
            .enter().append("g")
                .attr("class", "bar")
                .attr("transform", d => { 
                    return "translate(" + (x(d.x0) + barWidth ) + "," + y(d.length) + ")"; 
            });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", barWidth)
            .attr("height", d =>  { return height - y(d.length); });

        let textLoc = (x(bins[0].x1) - x(bins[0].x0));

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", textLoc)
            .attr("text-anchor", "middle")
            .text(d => formatCount(d.length));

        let xAxis = axisBottom(x);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(" + barWidth/2 + "," + height + ")")
            .call(xAxis);

        g.append("text")             
            .attr("transform",
                  "translate(" + (width + margin.left + margin.right)/2 + " ," + 
                                (height + margin.top + 30) + ")")
            .style("text-anchor", "middle")
            .text("Takt time [days]");
    }
}