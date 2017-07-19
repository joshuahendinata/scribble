import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RequestItemComponent } from './request-item/request-item.component';
import { SrItemComponent } from './sr-item/sr-item.component';
import { PageNotFoundComponent } from './not-found.component';


const appRoutes: Routes = [
  {
    path: 'app/requestPage',
    component: RequestItemComponent
  },
  {
    path: 'app/srPage',
    component: SrItemComponent
  },
  { path: '', redirectTo: '/app/requestPage', pathMatch: 'full' },
  { path: 'app', redirectTo: '/app/requestPage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RequestItemComponent,
    SrItemComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
