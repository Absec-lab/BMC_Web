import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDyActiveTripActionRendererComponent } from './edit-dy-active-trip-action-renderer.component';

describe('EditDyActiveTripActionRendererComponent', () => {
  let component: EditDyActiveTripActionRendererComponent;
  let fixture: ComponentFixture<EditDyActiveTripActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDyActiveTripActionRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDyActiveTripActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
