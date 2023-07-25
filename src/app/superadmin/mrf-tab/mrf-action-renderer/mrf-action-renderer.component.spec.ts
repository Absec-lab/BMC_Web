import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrfActionRendererComponent } from './mrf-action-renderer.component';

describe('MrfActionRendererComponent', () => {
  let component: MrfActionRendererComponent;
  let fixture: ComponentFixture<MrfActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrfActionRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrfActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
