export interface House {
  id:                number;
  name:              string;
  description:       string;
  roomsQuantity:     number;
  bathroomsQuantity: number;
  address:           string;
  price:             number;
  createDate:        Date;
  publishDate:       Date;
  category:          Category;
  location:          Location;
  publishState:      'PUBLICADA' | "PUBLICACION_PAUSADA" ;
}

export interface HouseRequest {
  name:              string;
  description:       string;
  roomsQuantity:     number;
  bathroomsQuantity: number;
  address:           string;
  price:             number;
  createDate:        Date;
  publishDate:       Date;
  category:          Category;
  location:          Location;
}

export interface Category {
  id:              number;
  name:            string;
  description:     string;
  houses?:         null;
  municipalities?: null;
}

export interface Location {
  id:                number;
  sector:            string;
  municipalityModel: MunicipalityModel;
  houses:            null;
}

export interface MunicipalityModel {
  id:              number;
  name:            string;
  description:     string;
  departmentModel: Category;
  locations:       null;
}
