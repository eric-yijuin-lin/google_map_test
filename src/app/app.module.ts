import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoAddressComponent } from './auto-address/auto-address.component';
import { MapSearchComponent } from './map-search/map-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoAddressComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
