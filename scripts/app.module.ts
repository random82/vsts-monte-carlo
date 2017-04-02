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
    WorkItemsService
} from './services/work-items.service';

import {
    WorkItemTrackingClient
} from './services/work-item-tracking.base';
import {
    TFSWorkItemTrackingClient
} from './services/tfs-work-item-tracking.client';

@NgModule({
    imports: [HttpModule, BrowserModule],
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
            useClass: TFSWorkItemTrackingClient
        }
    ]
})


export class AppModule {

}