import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { RolUser } from '../models/rolUser.interfaces';
import { ResponceUsualMessage } from 'src/app/shared/interfaces/responceUsualMessage.interface';
import { UserRequest } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private readonly baseUrl = environment.baseUrl
  private readonly baseUrl = environment.baseUserUrl

  constructor(private readonly http: HttpClient ) { }


  getAllRoles():Observable<RolUser[]> {
    const url = `${this.baseUrl}/rol-user/`
    return this.http.get<RolUser[]>(url)
  }

  postUser(user: UserRequest): Observable<ResponceUsualMessage> {
    console.log(user);

    const url = `${this.baseUrl}/user/`
    return this.http.post<ResponceUsualMessage>(url,user)
  }

}
