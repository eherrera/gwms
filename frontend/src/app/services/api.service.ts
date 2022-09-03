import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CustomServerDataSource } from './custom-server-datasource';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders();

  private gatewaysDataSource: CustomServerDataSource;

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  getGatewayDatasource() {
    this.gatewaysDataSource = new CustomServerDataSource(this.http, {
      dataKey: 'docs',
      filterFieldKey: 'filter',
      sortFieldKey: 'sort',
      sortDirKey: 'order',
      pagerLimitKey: 'limit',
      pagerPageKey: 'page',

      endPoint: `${environment.api.baseurl}/gateways`,
    });
    return this.gatewaysDataSource;
  }
}
