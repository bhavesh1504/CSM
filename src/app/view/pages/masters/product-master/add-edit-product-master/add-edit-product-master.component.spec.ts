import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProductMasterComponent } from './add-edit-product-master.component';

describe('AddEditProductMasterComponent', () => {
  let component: AddEditProductMasterComponent;
  let fixture: ComponentFixture<AddEditProductMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProductMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProductMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
