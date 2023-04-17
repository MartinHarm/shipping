import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Parcel } from '../models/parcel.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  createParcel(parcelData: Parcel): Observable<any> {
    return this.http.post(`${this.apiUrl}/parcel`, parcelData);
  }

  validateSKU(sku: string): Observable<{ valid: boolean }> {
    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/parcel/${sku}/validate`);
  }

  getCountries(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/country`);
  }

  getParcels(filter: { countrycode?: string, description?: string }, sortByDeliveryDate: string, pageSize: number, page: number): Observable<{ parcels: Parcel[], totalCount: number }> {
    let params = new HttpParams()
      .set('sortByDeliveryDate', sortByDeliveryDate)
      .set('pageSize', pageSize.toString())
      .set('page', page.toString());

    if (filter.countrycode) {
      params = params.set('country', filter.countrycode);
    }

    if (filter.description) {
      params = params.set('description', filter.description);
    }

    return this.http.get<{ parcels: Parcel[], totalCount: number }>(`${this.apiUrl}/parcel`, { params })
      .pipe(
        map(response => {
          return {
            parcels: response.parcels,
            totalCount: response.totalCount
          };
        })
      );
  }

}
