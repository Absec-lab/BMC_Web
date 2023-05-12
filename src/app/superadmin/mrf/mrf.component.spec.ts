import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrfComponent } from './mrf.component';

describe('MrfComponent', () => {
  let component: MrfComponent;
  let fixture: ComponentFixture<MrfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
