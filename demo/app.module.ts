import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent }  from '../scripts/components/app.landing.component';
import { TaktTimeComponent }  from '../scripts/components/app.tt.component';
import { SimulationComponent }  from '../scripts/components/app.simulation.component';

import { SimulationService } from '../scripts/services/simulation.service';
import { WorkItemsService } from '../scripts/services/work-items.service';
import {
    WorkItemTrackingClient
} from '../scripts/services/work-item-tracking.base';
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
        {
            provide: WorkItemTrackingClient,
            useClass: MockWorkItemTrackingClient
        }
    ]
})


export class AppModule {
     
}