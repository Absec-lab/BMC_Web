import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MokhataMoveToGodownComponent } from './mokhata-move-to-godown.component';

describe('MokhataMoveToGodownComponent', () => {
  let component: MokhataMoveToGodownComponent;
  let fixture: ComponentFixture<MokhataMoveToGodownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MokhataMoveToGodownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MokhataMoveToGodownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
