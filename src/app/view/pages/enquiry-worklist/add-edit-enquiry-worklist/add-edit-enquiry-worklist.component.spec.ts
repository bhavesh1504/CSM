import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEnquiryWorklistComponent } from './add-edit-enquiry-worklist.component';

describe('AddEditEnquiryWorklistComponent', () => {
  let component: AddEditEnquiryWorklistComponent;
  let fixture: ComponentFixture<AddEditEnquiryWorklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEnquiryWorklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEnquiryWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
