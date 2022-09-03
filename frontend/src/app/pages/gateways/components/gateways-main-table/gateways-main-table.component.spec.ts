/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GatewaysMainTableComponent } from './gateways-main-table.component';

describe('GatewaysMainTableComponent', () => {
  let component: GatewaysMainTableComponent;
  let fixture: ComponentFixture<GatewaysMainTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaysMainTableComponent ]
    })
    .compileComponents();
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
