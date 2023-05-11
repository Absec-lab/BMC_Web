import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails4Component } from './trip-details4.component';

describe('TripDetails4Component', () => {
  let component: TripDetails4Component;
  let fixture: ComponentFixture<TripDetails4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
