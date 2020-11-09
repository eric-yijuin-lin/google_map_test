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
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: []
})
export class MapSearchComponent implements OnInit {

  @ViewChild('map', { static: true }) mapElement: any;
  @ViewChild('autoComplete', { static: true }) autoComplete: any;

  @Input() searchInputLabel = 'Place Search';
  @Input() showMap = false;
  @Input() searchInputAlign: 'OUSTSIDE' | 'TOP_LEFT' | 'TOP_RIGHT' | 'TOP_CENTER'
    | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT' | 'BOTTOM_CENTER' = 'OUSTSIDE';
  @Input() mapCenter: { lat: number, lng: number } = { lat: 37.378582, lng: -121.960788 }; // Ambarella US

  @Output() placeChanged = new EventEmitter<Array<GooglePlaceSummary>>();

  componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name',
  };

  mapObj: google.maps.Map<HTMLElement>;
  searchBox: google.maps.places.SearchBox;

  constructor() { }

  ngOnInit(): void {
    console.log('map center', this.mapCenter);
    this.initAutocomplete();
  }

  initAutocomplete(): void {
    this.mapObj = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: this.mapCenter,
        zoom: 13,
        mapTypeId: 'roadmap',
      }
    );

    // Create the search box and link it to the UI element.
    this.setSearchInputAlign();

    // Bias the SearchBox results towards current map's viewport.
    this.mapObj.addListener('bounds_changed', () => {
      this.searchBox.setBounds(this.mapObj.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    this.searchBox.addListener('places_changed', () => this.placeChangedCallback());
  }

  private setSearchInputAlign() {
    const input = document.getElementById('searchTermInput') as HTMLInputElement;
    this.searchBox = new google.maps.places.SearchBox(input);

    if (this.searchInputAlign !== 'OUSTSIDE') {
      this.searchInputLabel = '';
    }

    switch (this.searchInputAlign) {
      case 'OUSTSIDE':
        break;
      case 'TOP_LEFT':
        this.mapObj.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        break;
      case 'TOP_RIGHT':
        this.mapObj.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);
        break;
      case 'TOP_CENTER':
        this.mapObj.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
        break;
      case 'BOTTOM_LEFT':
        this.mapObj.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(input);
        break;
      case 'BOTTOM_RIGHT':
        this.mapObj.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(input);
        break;
      case 'BOTTOM_CENTER':
        this.mapObj.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);
        break;
      default:
        break;
    }
  }

  private placeChangedCallback(): void {
    let markers: google.maps.Marker[] = [];
    const places = this.searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
        return;
      }
      const icon = {
        url: place.icon as string,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: this.mapObj,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.mapObj.fitBounds(bounds);

    // emit place info for parent components
    const placeSumarry = places.map(x => {
      const detail: GooglePlaceSummary = {
        address_components: x.address_components,
        adr_address: x.adr_address,
        formatted_address: x.formatted_address,
        name: x.name,
        place_id: x.place_id,
      };
      return detail;
    });
    this.placeChanged.emit(placeSumarry);
  }
}
