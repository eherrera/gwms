/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GatewaysSearchComponent } from './gateways-search.component';
import { first } from 'rxjs/operators';

describe('GatewaysSearchComponent', () => {
  let component: GatewaysSearchComponent;
  let fixture: ComponentFixture<GatewaysSearchComponent>;
  let inputDebugElement: DebugElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewaysSearchComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raise the search event', () => {
    const search = 'gateway 1';
    // let input = fixture.debugElement.query(By.css('input'));
    // input.nativeElement.value = search;
    component.search
      .pipe(first())
      .subscribe((query: string) => expect(query).toBe(search));
    component.onSearch(search);
  });

  it('raise the search event with the input query on search button clicked', () => {
    const search = 'gateway 1';
    let input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.value = search;
    let button = fixture.debugElement.query(By.css('button'));
    component.search
      .pipe(first())
      .subscribe((query: string) => expect(query).toBe(search));

    button.nativeElement.click();
  });

  it('raise the search event with the input query on search', () => {
    const search = 'gateway 1';
    inputDebugElement = fixture.debugElement.query(By.css('input'));
    inputDebugElement.nativeElement.value = search;

    component.search
      .pipe(first())
      .subscribe((query: string) => expect(query).toBe(search));

    inputDebugElement.nativeElement.dispatchEvent(new Event('search'));

    fixture.detectChanges();
  });
});
