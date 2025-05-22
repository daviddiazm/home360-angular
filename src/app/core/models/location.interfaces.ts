export interface Location {
  id:                number;
  sector:            string;
  municipalityModel: MunicipalityModel;
  houses:            any[];
}

export interface MunicipalityModel {
  id:              number;
  name:            string;
  description:     string;
  departmentModel: DepartmentModel;
  locations:       null;
}

export interface DepartmentModel {
  id:             number;
  name:           string;
  description:    string;
  municipalities: null;
}
