import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsMasterComponent } from './goods-master.component';

describe('GoodsMasterComponent', () => {
  let component: GoodsMasterComponent;
  let fixture: ComponentFixture<GoodsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
