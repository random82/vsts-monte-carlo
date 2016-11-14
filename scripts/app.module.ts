import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent }  from './components/app.landing.component';
import { WelcomeComponent } from './components/app.welcome.component';

import { WorkItemsService } from './services/work-items.service';
import { WorkItemTrackingClient } from './services/work-item-tracking.client';

@NgModule({
  imports: [BrowserModule],
  declarations: [
                WelcomeComponent,
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ],
  providers: [
                // WorkItemsService,
                // WorkItemTrackingClient
             ]
})

export class AppModule {
     
}