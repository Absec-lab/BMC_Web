import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsSubMasterComponent } from './goods-sub-master.component';

describe('GoodsSubMasterComponent', () => {
  let component: GoodsSubMasterComponent;
  let fixture: ComponentFixture<GoodsSubMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsSubMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsSubMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
