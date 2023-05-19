import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPoupComponent } from './modal.component';

describe('ModalPoupComponent', () => {
  let component: ModalPoupComponent;
  let fixture: ComponentFixture<ModalPoupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPoupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPoupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
