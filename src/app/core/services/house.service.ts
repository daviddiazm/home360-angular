import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { GetHousesFilter, House, HouseRequest } from '../models/house.interface';
import { Observable } from 'rxjs';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';
import { Page } from '../models/page.interface';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly regionBaseUrl = environment.regionUrl;
  private readonly baseUrl = environment.baseUrl

  constructor(private readonly http: HttpClient) { }

  postHouse(hosue: HouseRequest): Observable<ResponceUsualMessage> {
    const url = `${this.baseUrl}/house/`
    return this.http.post<ResponceUsualMessage>(url, hosue)
  }

getHousesPaginated(request: GetHousesFilter): Observable<Page<House>> {
    const { page, size, orderAsc, cityName, idCategory, roomsQuantity, bathroomsQuantity, minPrice, maxPrice } = request;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderAsc', orderAsc.toString())
      .set('idCategory', idCategory.toString())
      .set('roomsQuantity', roomsQuantity.toString())
      .set('bathroomsQuantity', bathroomsQuantity.toString())
      .set('minPrice', minPrice.toString())
      .set('maxPrice', maxPrice.toString());

    if (cityName) {
      params = params.set('cityName', cityName);
    }

    const url = `${this.baseUrl}/house/by-city-name/`;
    return this.http.get<Page<House>>(url, { params });
}
}
