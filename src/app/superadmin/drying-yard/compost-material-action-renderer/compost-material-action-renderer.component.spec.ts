import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompostMaterialActionRendererComponent } from './compost-material-action-renderer.component';

describe('CompostMaterialActionRendererComponent', () => {
  let component: CompostMaterialActionRendererComponent;
  let fixture: ComponentFixture<CompostMaterialActionRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompostMaterialActionRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompostMaterialActionRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
