import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails1Component } from './trip-details1.component';

describe('TripDetails1Component', () => {
  let component: TripDetails1Component;
  let fixture: ComponentFixture<TripDetails1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
