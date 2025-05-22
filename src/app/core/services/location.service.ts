import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Department } from '../models/department.interface';
import { City } from '../models/city.interface';
import { Location } from '../models/location.interfaces';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';
import { Page } from '../models/page.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly regionBaseUrl = environment.regionUrl;
  private readonly baseUrl = environment.baseUrl

  constructor(private readonly http: HttpClient) { }

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

  getPaginatedLocation(page: number, size: number, orderAsc: boolean, name: string): Observable<Page<Location>> {
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('orderAsc', orderAsc.toString())
    .set('name', name);
    const url = `${this.baseUrl}/locations/?${params}`
    return this.http.get<Page<Location>>(url)
  }
}
