import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders();

  private gatewaysDataSource: ServerDataSource;

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }

  getGatewayDatasource() {
    this.gatewaysDataSource = new ServerDataSource(this.http, {
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
