import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLoanTypeComponent } from './add-edit-loan-type.component';

describe('AddEditLoanTypeComponent', () => {
  let component: AddEditLoanTypeComponent;
  let fixture: ComponentFixture<AddEditLoanTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLoanTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLoanTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
