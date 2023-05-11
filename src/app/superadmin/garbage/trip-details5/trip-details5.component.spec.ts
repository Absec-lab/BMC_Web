import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails5Component } from './trip-details5.component';

describe('TripDetails5Component', () => {
  let component: TripDetails5Component;
  let fixture: ComponentFixture<TripDetails5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
