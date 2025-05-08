import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Department } from '../models/department.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private regionBaseUrl = environment.regionUrl;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    const url = `${this.regionBaseUrl}/Department/`
    return this.http.get<Department[]>(url)
  }

  getNameDepartments(): Observable<string[]> {
    const url = `${this.regionBaseUrl}/Department/`
    return this.http.get<Department[]>(url).pipe(
      map((departments: Department[]) => {
        return departments.map((department) => department.name)
      })
    )
  }

}
