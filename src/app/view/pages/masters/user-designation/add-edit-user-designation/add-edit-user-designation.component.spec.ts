import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserDesignationComponent } from './add-edit-user-designation.component';

describe('AddEditUserDesignationComponent', () => {
  let component: AddEditUserDesignationComponent;
  let fixture: ComponentFixture<AddEditUserDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditUserDesignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUserDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
