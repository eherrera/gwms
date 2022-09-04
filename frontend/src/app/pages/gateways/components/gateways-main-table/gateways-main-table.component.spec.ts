/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GatewaysMainTableComponent } from './gateways-main-table.component';
import { ToastrService } from 'ngx-toastr';
import { toastrService } from '@/utils/testing';

describe('GatewaysMainTableComponent', () => {
  let component: GatewaysMainTableComponent;
  let fixture: ComponentFixture<GatewaysMainTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: ToastrService, useValue: toastrService }],

      declarations: [GatewaysMainTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysMainTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
