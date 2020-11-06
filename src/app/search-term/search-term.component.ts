import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AddressComponent, GooglePlaceSummary } from '../auto-address/autocomplete-interface';


@Component({
  selector: 'app-search-term',
  templateUrl: './search-term.component.html',
  styleUrls: []
})
export class SearchTermComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  @ViewChild('autoComplete', { static: true }) autoComplete: any;

  @Input() adressType: string;
  @Output() placeChanged = new EventEmitter<Array<GooglePlaceSummary>>();

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
  };

  constructor() { }

  ngOnInit(): void {
    this.initMapSearch();
  }

  initMapSearch(): void {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(36.379043, -122.961110),
      new google.maps.LatLng(38.379043, -120.961110),
    );

    const searchInput = document.getElementById('searchTermInput') as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(searchInput, {
      bounds: defaultBounds
    });

    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      const placeDetails = places.map(x => {
        const detail: GooglePlaceSummary = {
          address_components: x.address_components,
          adr_address: x.adr_address,
          formatted_address: x.formatted_address,
          name: x.name,
          place_id: x.place_id,
        };
        return detail;
      });

      if (places.length === 0) {
        return;
      }

      console.log('emitting place list', placeDetails);
      this.placeChanged.emit(placeDetails);
    });
  }
}
