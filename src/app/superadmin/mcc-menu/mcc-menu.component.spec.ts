import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MccMenuComponent } from './mcc-menu.component';

describe('MccMenuComponent', () => {
  let component: MccMenuComponent;
  let fixture: ComponentFixture<MccMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MccMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MccMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
