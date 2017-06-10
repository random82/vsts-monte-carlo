import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';
import { SimulationService } from '../services/simulation.service';

import { WorkItem } from '../Model/WorkItem';


@Component({
    selector:'calendar',
    templateUrl:'./app.calendar.component.html'
})
export class CalendarComponent {

}