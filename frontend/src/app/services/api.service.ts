import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CustomServerDataSource } from './custom-server-datasource';
import { Observable } from 'rxjs';
import { Gateway } from '@/models/gateway';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders();

  private gatewaysDataSource: CustomServerDataSource;

  constructor(private http: HttpClient) {
    this.headers = this.headers.set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
  }

  getGatewayDatasource() {
    this.gatewaysDataSource = new CustomServerDataSource(this.http, {
      dataKey: 'docs',
      filterFieldKey: 'filter',
      sortFieldKey: 'sort',
      sortDirKey: 'order',
      pagerLimitKey: 'limit',
      pagerPageKey: 'page',
      totalKey: 'totalDocs',

      endPoint: `${environment.api.baseurl}/gateways?&fields=name,serial_number,ipv4`,
    });
    return this.gatewaysDataSource;
  }

  postGateway(gateway: Gateway): Observable<Gateway> {
    const body = new HttpParams()
      .set('serialNumber', gateway.serial_number)
      .set('name', gateway.name)
      .set('ipv4', gateway.ipv4)
      .set('devices', JSON.stringify(gateway.devices));

    return this.http.post(`${environment.api.baseurl}/gateways`, body, {
      headers: this.headers,
    }) as Observable<Gateway>;
  }

  getGateway(id: string): Observable<Gateway> {
    return this.http.get(`${environment.api.baseurl}/gateways/${id}`, {
      headers: this.headers,
    }) as Observable<Gateway>;
  }
}
