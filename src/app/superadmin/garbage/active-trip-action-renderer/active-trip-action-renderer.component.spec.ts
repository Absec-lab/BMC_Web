import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTripActionRendererComponent } from './active-trip-action-renderer.component';

describe('ActiveTripActionRendererComponent', () => {
  let component: ActiveTripActionRendererComponent;
  let fixture: ComponentFixture<ActiveTripActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveTripActionRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveTripActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
