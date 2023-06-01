import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryCompostWeighmentComponent } from './dry-compost-weighment.component';

describe('DryCompostWeightmentComponent', () => {
  let component: DryCompostWeighmentComponent;
  let fixture: ComponentFixture<DryCompostWeighmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DryCompostWeighmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DryCompostWeighmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
