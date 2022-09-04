/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GatewayAddEditFormComponent } from './gateway-add-edit-form.component';
import { ToastrService } from 'ngx-toastr';
import { toastrService } from '@/utils/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('GatewayAddEditFormComponent', () => {
  let component: GatewayAddEditFormComponent;
  let fixture: ComponentFixture<GatewayAddEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewayAddEditFormComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: ToastrService, useValue: toastrService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
