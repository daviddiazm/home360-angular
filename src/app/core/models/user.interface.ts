export interface User {
  id:             number;
  identification: string;
  name:           string;
  lastName:       string;
  phoneNumber:    string;
  birthday:       Date;
  email:          string;
  password:       string;
  rolUser:        number;
}

export interface UserRequest {
  identification: string;
  name:           string;
  lastName:       string;
  phoneNumber:    string;
  birthday:       Date;
  email:          string;
  password:       string;
  rolUser:        number;
}
