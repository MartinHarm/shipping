import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from "../models/country.model";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  countries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/country`);
  }
}
