import {
    NgModule
} from '@angular/core';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    HttpModule
} from '@angular/http';

import {
    LandingComponent
} from './components/app.landing.component';

import {
    TaktTimeComponent
} from './components/app.tt.component';

import {
    SimulationComponent
} from './components/app.simulation.component';

import {
    CalendarComponent
} from './components/app.calendar.component';

import {
    WorkItemsService
} from './services/work-items.service';

import {
    WorkItemTrackingClient
} from './services/work-item-tracking.base';
import {
    TFSWorkItemTrackingClient
} from './services/tfs.work-item-tracking.client';

import {
    SimulationService
} from './services/simulation.service';

@NgModule({
    imports: [HttpModule, BrowserModule],
    declarations: [
        LandingComponent,
        TaktTimeComponent,
        SimulationComponent,
        CalendarComponent
    ],
    bootstrap: [
        LandingComponent
    ],
    providers: [
        SimulationService,
        WorkItemsService,
        {
            provide: WorkItemTrackingClient,
            useClass: TFSWorkItemTrackingClient
        }
    ]
})


export class AppModule {

}