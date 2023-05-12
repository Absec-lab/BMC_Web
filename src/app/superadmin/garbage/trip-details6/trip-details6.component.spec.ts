import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails6Component } from './trip-details6.component';

describe('TripDetails6Component', () => {
  let component: TripDetails6Component;
  let fixture: ComponentFixture<TripDetails6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
