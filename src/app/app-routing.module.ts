import { MapSearchComponent } from './map-search/map-search.component';
import { AutoAddressComponent } from './auto-address/auto-address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'auto', component: AutoAddressComponent },
  { path: 'search', component: MapSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
