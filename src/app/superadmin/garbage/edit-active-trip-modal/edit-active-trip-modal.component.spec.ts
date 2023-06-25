import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActiveTripModalComponent } from './edit-active-trip-modal.component';

describe('EditActiveTripModalComponent', () => {
  let component: EditActiveTripModalComponent;
  let fixture: ComponentFixture<EditActiveTripModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActiveTripModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditActiveTripModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
