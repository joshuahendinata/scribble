import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RequestItemComponent } from './request-item/request-item.component';
import { RequestItemDetailComponent } from './request-item/request-item-detail.component';
import { SrItemComponent } from './sr-item/sr-item.component';
import { PageNotFoundComponent } from './not-found.component';


const appRoutes: Routes = [
  {
    path: 'app',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'requestPage'
      },
      {
        path: 'requestPage',
        component: RequestItemComponent
      },
      {
        path: 'requestDetail',
        component: RequestItemDetailComponent
      },
      {
        path: 'srPage',
        component: SrItemComponent
      },
    ]
  },
  { path: '', redirectTo: 'app/requestPage', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RequestItemComponent,
    RequestItemDetailComponent,
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
