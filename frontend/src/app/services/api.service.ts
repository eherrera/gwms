import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UnitType } from '@/models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('x-api-key', environment.api.apikey);
  }

  getUnitTypes(companyId: number): Observable<Array<UnitType>> {
    return this.http.get(
      `${environment.api.baseurl}unittype/list/${companyId}`,
      { headers: this.headers }
    ) as Observable<Array<UnitType>>;
  }
}
