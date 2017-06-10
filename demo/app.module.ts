import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent }  from '../scripts/components/app.landing.component';
import { TaktTimeComponent }  from '../scripts/components/app.tt.component';
import { SimulationComponent }  from '../scripts/components/app.simulation.component';
import { CalendarComponent } from '../scripts/components/app.calendar.component';

import { IterationService } from '../scripts/services/iteration.service';

import { SimulationService } from '../scripts/services/simulation.service';
import { WorkItemsService } from '../scripts/services/work-items.service';
import {
    WorkItemTrackingClient
} from '../scripts/services/work-item-tracking.base';

import {
    ProjectSettingsClient
} from '../scripts/services/project-settings.client.base';

import { MockProjectSettingsClient } from './mocks/project-settings.client';
import { MockWorkItemTrackingClient } from './mocks/work-item-tracking.client';

@NgModule({
  imports: [BrowserModule],
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
        IterationService,
        {
            provide: WorkItemTrackingClient,
            useClass: MockWorkItemTrackingClient
        },
        {
            provide: ProjectSettingsClient,
            useClass: MockProjectSettingsClient
        }
    ]
})


export class AppModule {
     
}