import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPincodeComponent } from './add-edit-pincode.component';

describe('AddEditPincodeComponent', () => {
  let component: AddEditPincodeComponent;
  let fixture: ComponentFixture<AddEditPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPincodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
