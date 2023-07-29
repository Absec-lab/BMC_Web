import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsVehicleMasterComponent } from './tts-vehicle-master.component';

describe('TtsVehicleMasterComponent', () => {
  let component: TtsVehicleMasterComponent;
  let fixture: ComponentFixture<TtsVehicleMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtsVehicleMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsVehicleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
