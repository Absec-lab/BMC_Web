import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadeDashboardComponentComponent } from './heade-dashboard-component.component';

describe('HeadeDashboardComponentComponent', () => {
  let component: HeadeDashboardComponentComponent;
  let fixture: ComponentFixture<HeadeDashboardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadeDashboardComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadeDashboardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
