import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrfTabComponent } from './mrf-tab.component';

describe('InventoryComponent', () => {
  let component: MrfTabComponent;
  let fixture: ComponentFixture<MrfTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrfTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrfTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
