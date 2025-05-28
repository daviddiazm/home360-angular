import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HouseRequest } from '../models/house.interface';
import { Observable } from 'rxjs';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private readonly regionBaseUrl = environment.regionUrl;
  private readonly baseUrl = environment.baseUrl

  constructor(private readonly http: HttpClient) { }

  postHouse(hosue : HouseRequest):Observable<ResponceUsualMessage> {
    const url = `${this.baseUrl}/house/`
    return this.http.post<ResponceUsualMessage>(url, hosue)
  }

}
