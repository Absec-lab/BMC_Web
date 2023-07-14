import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDyActiveTripModalComponent } from './edit-dy-active-trip-modal.component';

describe('EditDyActiveTripModalComponent', () => {
  let component: EditDyActiveTripModalComponent;
  let fixture: ComponentFixture<EditDyActiveTripModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDyActiveTripModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDyActiveTripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
