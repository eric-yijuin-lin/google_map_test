import { AddressComponent, GooglePlaceSummary } from './auto-address/autocomplete-interface';
import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  OnInit,
  AfterViewInit,
  Input,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { } from 'googlemaps';
import { AutoAddressComponent } from './auto-address/auto-address.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'place search test';
  placeInfoList: GooglePlaceSummary[];

  @ViewChild('tAutoAddress', { static: true })
  tAutoAddress: AutoAddressComponent;

  constructor() { }

  ngAfterViewInit(): void { }

  handlePlaceChange(e: GooglePlaceSummary[]): void {
    this.placeInfoList = e;
  }
}
