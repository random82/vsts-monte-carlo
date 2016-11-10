import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { LandingComponent }  from './components/app.landing.component';
import { WelcomeComponent } from './components/app.welcome.component';

@NgModule({
  imports: [BrowserModule, 
            RouterModule.forRoot([{
                path: 'index.html',
                component: WelcomeComponent
            },
            {
                path: '',
                component: WelcomeComponent
            }
            ])],
  declarations: [
                WelcomeComponent,
                LandingComponent
                ],
  bootstrap: [
                LandingComponent
             ],
  providers: [

             ]
})

export class AppModule { }
