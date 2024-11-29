import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient }from '@angular/common/http';
import { ApiResponse } from '../interfaces/ApiResponse';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlBase = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  public getCharacters(url: string = this.urlBase): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }
}
