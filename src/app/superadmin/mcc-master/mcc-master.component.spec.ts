import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccMasterComponent } from './mcc-master.component';

describe('MccMasterComponent', () => {
  let component: MccMasterComponent;
  let fixture: ComponentFixture<MccMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
