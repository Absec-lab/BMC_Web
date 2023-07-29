import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyMasterComponent } from './agency-master.component';

describe('WardMasterComponent', () => {
  let component: AgencyMasterComponent;
  let fixture: ComponentFixture<AgencyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
