/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GatewayAddEditFormComponent } from './gateway-add-edit-form.component';
import { ToastrService } from 'ngx-toastr';
import { toastrService, fakeTyping } from '@/utils/testing';
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
    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ipv4 field be valid when entering a good ip', () => {
    let input = fixture.debugElement.query(By.css('#ipv4'));
    input.nativeElement.focus();
    fakeTyping('10.0.0.1', input.nativeElement);

    fixture.detectChanges();

    expect(!component.ipv4.invalid).toBeTruthy();
  });

  it('should ipv4 field be invalid when entering bad ip', () => {
    let input = fixture.debugElement.query(By.css('#ipv4'));
    input.nativeElement.focus();
    fakeTyping('10.0.0.3333', input.nativeElement);

    fixture.detectChanges();

    expect(component.ipv4.invalid).toBeTruthy();
  });

  it('should form be invalid when bad input', () => {
    let input = fixture.debugElement.query(By.css('#ipv4'));
    fakeTyping('10.0.0.3333', input.nativeElement);

    fixture.detectChanges();

    expect(component.gatewayForm.invalid).toBeTruthy();
  });

  it('should form be valid on input ok', () => {
    let ipv4 = fixture.debugElement.query(By.css('#ipv4'));
    let name = fixture.debugElement.query(By.css('#name'));
    let sn = fixture.debugElement.query(By.css('#serialNumber'));

    fakeTyping('10.0.0.1', ipv4.nativeElement);
    fakeTyping('Gateway 1', name.nativeElement);
    fakeTyping('00 55 66 77', sn.nativeElement);


    fixture.detectChanges();

    expect(component.gatewayForm.valid).toBeTruthy();
  });
});
