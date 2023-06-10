import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ManpowerComponent } from './manpower.component';

describe('ManpowerComponent', () => {
  let component: ManpowerComponent;
  let fixture: ComponentFixture<ManpowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManpowerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManpowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
