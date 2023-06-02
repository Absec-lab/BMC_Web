import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PitMasterComponent } from './pit-master.component';

describe('PitMasterComponent', () => {
  let component: PitMasterComponent;
  let fixture: ComponentFixture<PitMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PitMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PitMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
