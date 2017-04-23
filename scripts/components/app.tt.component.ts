import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { WorkItemsService } from '../services/work-items.service';

import { WorkItem } from '../Model/WorkItem';

import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';

@Component({
    selector:'takt-time',
    templateUrl:'./app.tt.component.html'
})
export class TaktTimeComponent {

}