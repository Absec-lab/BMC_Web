import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails2Component } from './trip-details2.component';

describe('TripDetails2Component', () => {
  let component: TripDetails2Component;
  let fixture: ComponentFixture<TripDetails2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
