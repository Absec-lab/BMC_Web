import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WealthCenterMasterComponent } from './wealth-center-master.component';

describe('WealthCenterMasterComponent', () => {
  let component: WealthCenterMasterComponent;
  let fixture: ComponentFixture<WealthCenterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WealthCenterMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WealthCenterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
