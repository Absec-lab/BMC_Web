import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetails3Component } from './trip-details3.component';

describe('TripDetails3Component', () => {
  let component: TripDetails3Component;
  let fixture: ComponentFixture<TripDetails3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetails3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripDetails3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
