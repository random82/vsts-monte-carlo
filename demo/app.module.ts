import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { LandingComponent }  from './app.landing.component';


@NgModule({
  imports: [HttpModule, BrowserModule],
  declarations: [
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ]
})


export class AppModule {
     
}