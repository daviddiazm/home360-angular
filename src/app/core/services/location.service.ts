import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Department } from '../models/department.interface';
import { City } from '../models/city.interface';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private regionBaseUrl = environment.regionUrl;
  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    const url = `${this.regionBaseUrl}/Department/`
    return this.http.get<Department[]>(url)
  }

  getCitiesByDepartment(id: number):Observable<City[]> {
    const url = `${this.regionBaseUrl}/Department/${id}/cities`
    return this.http.get<City[]>(url)
  }

  getNameMunicipalities(id: number):Observable<string[]> {
    const url = `${this.regionBaseUrl}/Department/${id}/cities`
    return this.http.get<City[]>(url).pipe(
      map((cities:City[]) => cities.map((city) => city.name))
    )
  }

  getAllCities():Observable<City[]>{
    const url = `${this.regionBaseUrl}/City`
    return this.http.get<City[]>(url)
  }

  postLocation(sector:string , municipalityId: number):Observable<ResponceUsualMessage> {
    const url = `${this.baseUrl}/locations/`
    return this.http.post<ResponceUsualMessage>(url, {sector, municipalityId})
  }

}
