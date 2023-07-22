import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsMasterComponent } from './tts-master.component';

describe('TtsMasterComponent', () => {
  let component: TtsMasterComponent;
  let fixture: ComponentFixture<TtsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtsMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
