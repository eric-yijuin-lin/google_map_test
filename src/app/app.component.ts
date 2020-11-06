import { AddressComponent } from './auto-address/autocomplete-interface';
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
import {} from 'googlemaps';
import { AutoAddressComponent } from './auto-address/auto-address.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AutoCompleteTest';
  addressWithShortName: string;
  addressWithLongName: string;

  @ViewChild('tAutoAddress', { static: true })
  tAutoAddress: AutoAddressComponent;

  constructor() {}

  ngAfterViewInit(): void {}

  handlePlaceChange(e: AddressComponent[]): void {
    console.log('handlePlaceChange', e);
    this.addressWithShortName = '';
    this.addressWithLongName = '';
    for (const comp of e) {
      this.addressWithShortName += comp.short_name + ', ';
      this.addressWithLongName += comp.long_name + ', ';
    }

    console.log('short', this.addressWithShortName);
    console.log('long', this.addressWithLongName);
  }
}
