import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoAddressComponent } from './auto-address/auto-address.component';
import { SearchTermComponent } from './search-term/search-term.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoAddressComponent,
    SearchTermComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
