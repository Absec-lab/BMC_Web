import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemCategoryMasterComponent } from './item-category-master.component';

describe('ItemCategoryMasterComponent', () => {
  let component: ItemCategoryMasterComponent;
  let fixture: ComponentFixture<ItemCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCategoryMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
