// Generated by https://quicktype.io
export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}


// Generated by https://quicktype.io
export interface GooglePlaceSummary {
  address_components: AddressComponent[];
  adr_address: string;
  formatted_address: string;
  name: string;
  place_id: string;
}

export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface Geometry {
  location: Location;
}
