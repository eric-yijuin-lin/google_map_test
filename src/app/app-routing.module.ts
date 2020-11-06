import { SearchTermComponent } from './search-term/search-term.component';
import { AutoAddressComponent } from './auto-address/auto-address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'auto', component: AutoAddressComponent },
  { path: 'search', component: SearchTermComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
