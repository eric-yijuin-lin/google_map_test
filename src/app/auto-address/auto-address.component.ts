import { AddressComponent } from './autocomplete-interface';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-auto-address',
  templateUrl: './auto-address.component.html',
  styleUrls: ['./auto-address.component.css'],
})
export class AutoAddressComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  @ViewChild('autoComplete', { static: true }) autoComplete: any;

  @Input() adressType: string;
  @Output() placeChanged = new EventEmitter<AddressComponent[]>();

  map: google.maps.Map;
  autocompleteInput: string;
  queryWait: boolean;
  placeSearch: google.maps.places.PlacesService;
  autocomplete: google.maps.places.Autocomplete;
  // currentPlace: google.maps.places.PlaceResul;

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
  };

  constructor() {}

  ngOnInit(): void {
    this.initAutocomplete();
  }

  initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete') as HTMLInputElement,
      { types: ['address'] }
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    this.autocomplete.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    // this.autocomplete.addListener('place_changed', () => this.fillInAddress());
    this.autocomplete.addListener('place_changed', () => this.showPlaceInfo());
  }

  showPlaceInfo(): void {
    const place = this.autocomplete.getPlace();
    let address: AddressComponent[] = [];
    if (place.address_components) {
      address = place.address_components;
      this.placeChanged.emit(address);
    }

    console.log('Place info: ', place);
  }

  // onPlaceChanged(): google.maps.places.PlaceResult {
  //   this.currentPlace = this.autocomplete.getPlace();
  //   return this.currentPlace;
  // }

  fillInAddress(): void {
    // Get the place details from the autocomplete object.
    const place = this.autocomplete.getPlace();

    for (const component in this.componentForm) {
      (document.getElementById(component) as HTMLInputElement).value = '';
      (document.getElementById(component) as HTMLInputElement).disabled = false;
    }

    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the form.
    for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
      const addressType = component.types[0];

      if (this.componentForm[addressType]) {
        const val = component[this.componentForm[addressType]];
        (document.getElementById(addressType) as HTMLInputElement).value = val;
      }
    }
  }

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  setCurrentGeolocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy,
        });
        this.autocomplete.setBounds(circle.getBounds());
      });
    } else {
      alert('Your browser does not support "navigator.geolocation"');
    }
  }
}
