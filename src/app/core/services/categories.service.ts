import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Category } from '../models/category.interfaces';
import { Page } from '../models/page.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = environment.baseUrl
  private categoryApiUrl = `${this.baseUrl}/categories`

  constructor(private http: HttpClient) {}

  postCategory(name: string, description: string): Observable<Category> {
    const url = `${this.categoryApiUrl}/`;
    return this.http.post<Category>(url, {name, description});
  }

  getCategoriesByPage(page: number, size: number, orderAsc: boolean): Observable<Page<Category>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('orderAsc', orderAsc.toString());
    const url = `${this.categoryApiUrl}/?${params}`
    return this.http.get<Page<Category>>(url)
  }

  getCategoryByName(name: string): Observable<Category> {
    let params = new HttpParams().set('name', name)
    const url = `${this.categoryApiUrl}/category-by-name?${params}`
    return this.http.get<Category>(url)
  }
}
