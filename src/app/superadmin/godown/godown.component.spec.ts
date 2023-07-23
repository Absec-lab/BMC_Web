import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownComponent } from './godown.component';

describe('GodownComponent', () => {
  let component: GodownComponent;
  let fixture: ComponentFixture<GodownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GodownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
