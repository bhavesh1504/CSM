import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMapAreaPincodeToBranchComponent } from './add-edit-map-area-pincode-to-branch.component';

describe('AddEditMapAreaPincodeToBranchComponent', () => {
  let component: AddEditMapAreaPincodeToBranchComponent;
  let fixture: ComponentFixture<AddEditMapAreaPincodeToBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMapAreaPincodeToBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMapAreaPincodeToBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
