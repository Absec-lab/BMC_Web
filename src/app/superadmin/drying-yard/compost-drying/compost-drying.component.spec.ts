import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompostDryingComponent } from './compost-drying.component';

describe('CompostDryingComponent', () => {
  let component: CompostDryingComponent;
  let fixture: ComponentFixture<CompostDryingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompostDryingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompostDryingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
