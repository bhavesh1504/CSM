import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserDepartmentComponent } from './add-edit-user-department.component';

describe('AddEditUserDepartmentComponent', () => {
  let component: AddEditUserDepartmentComponent;
  let fixture: ComponentFixture<AddEditUserDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
