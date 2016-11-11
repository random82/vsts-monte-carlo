/// <reference path='../typings/tsd.d.ts' />
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent }  from './components/app.landing.component';
import { WelcomeComponent } from './components/app.welcome.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
                WelcomeComponent,
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ],
  providers: [ ]
})

export class AppModule {
     
}

VSS.notifyLoadSucceeded();
