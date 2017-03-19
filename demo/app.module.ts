import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LandingComponent }  from '../scripts/components/app.landing.component';

import { WorkItemsService } from '../scripts/services/work-items.service';
import { WorkItemTrackingClient } from './mocks/work-item-tracking.client';

@NgModule({
  imports: [HttpModule, BrowserModule],
  declarations: [
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ],
  providers: [
    WorkItemTrackingClient, 
    WorkItemsService]
})


export class AppModule {
     
}