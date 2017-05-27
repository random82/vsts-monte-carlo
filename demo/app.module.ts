import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent }  from '../scripts/components/app.landing.component';
import { TaktTimeComponent }  from '../scripts/components/app.tt.component';
import { SimulationComponent }  from '../scripts/components/app.simulation.component';

import { IterationService } from '../scripts/services/iteration.service';

import { SimulationService } from '../scripts/services/simulation.service';
import { WorkItemsService } from '../scripts/services/work-items.service';
import {
    WorkItemTrackingClient
} from '../scripts/services/work-item-tracking.base';

import {
    IterationClient
} from '../scripts/services/iteration.client.base';

import { MockIterationClient } from './mocks/iteration.client';
import { MockWorkItemTrackingClient } from './mocks/work-item-tracking.client';

@NgModule({
  imports: [BrowserModule],
  declarations: [
        LandingComponent,
        TaktTimeComponent,
        SimulationComponent
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
            provide: IterationClient,
            useClass: MockIterationClient
        }
    ]
})


export class AppModule {
     
}