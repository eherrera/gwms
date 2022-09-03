import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient) {
    this.headers = this.headers.set('Content-Type', 'application/json');
  }
}
