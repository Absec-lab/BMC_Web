import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownMasterComponent } from './godown-master.component';

describe('GodownMasterComponent', () => {
  let component: GodownMasterComponent;
  let fixture: ComponentFixture<GodownMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodownMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
