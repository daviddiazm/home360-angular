export interface Department {
  id:                     number;
  name:                   string;
  description:            string;
  cityCapitalId:          number;
  municipalities:         number;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  cityCapital:            CityCapital;
  country:                null;
  cities:                 null;
  regionId:               number;
  region:                 null;
  naturalAreas:           null;
  maps:                   null;
  indigenousReservations: null;
  airports:               null;
}

export interface CityCapital {
  id:                     number;
  name:                   string;
  description:            string;
  surface:                number | null;
  population:             number | null;
  postalCode:             null | string;
  departmentId:           number;
  department:             null;
  touristAttractions:     null;
  presidents:             null;
  indigenousReservations: null;
  airports:               null;
  radios:                 null;
}
