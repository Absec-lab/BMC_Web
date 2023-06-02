import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelperMasterComponent } from './helper-master.component';

describe('DriverMasterComponent', () => {
  let component: HelperMasterComponent;
  let fixture: ComponentFixture<HelperMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelperMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelperMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
