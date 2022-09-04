import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Gateway } from '@/models/gateway';
import { of } from 'rxjs';

describe('Gateway ApiService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    // service = TestBed.inject(ApiService);

    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'patch',
      'delete',
    ]);
    service = new ApiService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getGateway function', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service.getGateway).toBeTruthy();
  });

  it('should return expected gateway (HttpClient called once)', (done: DoneFn) => {
    const gatewayId = 'a';
    const expectedGateway: Gateway = {
      _id: gatewayId,
      serial_number: 'sn',
      name: 'name',
      ipv4: '10.0.0.0',
    };

    httpClientSpy.get.and.returnValue(of(expectedGateway));

    service.getGateway(gatewayId).subscribe({
      next: (gateway) => {
        expect(gateway)
          .withContext('expected gateway')
          .toEqual(expectedGateway);
        done();
      },
      error: done.fail,
    });
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
  });
});
