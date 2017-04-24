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

        let data = range(1000).map(randomBates(10));

        let formatCount = format(",.0f");

        let hist = select(this.el),
            margin = {top: 10, right: 30, bottom: 30, left: 30},
            width = +hist.attr("width") - margin.left - margin.right,
            height = +hist.attr("height") - margin.top - margin.bottom,
            g = hist.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x = scaleLinear<number>()
            .rangeRound([0, width]);

        let generator = histogram<number>()
            .domain(x.domain)
            .thresholds(x.ticks(20));
            
        let bins = generator(data);

        let y = scaleLinear<number>()
            .domain([0, max(bins, d => { return d.length; })])
            .range([height, 0]);

        let bar = g.selectAll(".bar")
            .data(bins)
            .enter().append("g")
                .attr("class", "bar")
                .attr("transform", d => { 
                    return "translate(" + x(d.x0) + "," + y(d.length) + ")"; 
            });

        let barWidth = x(bins[0].x1) - x(bins[0].x0) - 1;

        bar.append("rect")
            .attr("x", 1)
            .attr("width", barWidth)
            .attr("height", d =>  { return height - y(d.length); });

        let textLoc = (x(bins[0].x1) - x(bins[0].x0)) / 2;

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", textLoc)
            .attr("text-anchor", "middle")
            .text(d => { return formatCount(d.length); });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(x));

    }
}