import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent }  from '../scripts/Components/app.landing.component';

import { SimulationService } from '../scripts/services/simulation.service';
import { WorkItemsService } from '../scripts/services/work-items.service';
import {
    WorkItemTrackingClient
} from '../scripts/services/work-item-tracking.base';
import { MockWorkItemTrackingClient } from './mocks/work-item-tracking.client';

@NgModule({
  imports: [BrowserModule],
  declarations: [
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ],
  providers: [
        WorkItemsService,
        {
            provide: WorkItemTrackingClient,
            useClass: MockWorkItemTrackingClient
        }
    ]
})


export class AppModule {
     
}