import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DailyComponent } from './daily.component';
import { WeeklyComponent } from './weekly.component';
import { DemoComponent } from './demo.component';



const routes: Routes = [
  { path: 'weekly-schedule', component: WeeklyComponent },
  { path: 'daily-schedule', component: DailyComponent },
  { path: 'demo-schedule', component: DemoComponent }
];

@NgModule({
  declarations: [
    AppComponent,DailyComponent,WeeklyComponent,DemoComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
