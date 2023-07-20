import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStatusReportComponent } from './trip-status-report.component';

describe('TripStatusReportComponent', () => {
  let component: TripStatusReportComponent;
  let fixture: ComponentFixture<TripStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripStatusReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
