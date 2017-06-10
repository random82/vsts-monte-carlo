import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { IterationService } from '../services/iteration.service';

import { Iteration } from '../model/iteration';


@Component({
    selector:'calendar',
    templateUrl:'./app.calendar.component.html'
})
export class CalendarComponent implements OnInit {

    public Iterations : Array<Iteration>;

    constructor(private IterationService: IterationService,
                private zone: NgZone) {

    }

    ngOnInit(): void {
        this.IterationService.getIterations().then((r) =>{
            this.zone.run(() => {
                this.Iterations = r;
            });
        });
    }
}