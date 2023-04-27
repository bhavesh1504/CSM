import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEnquiryStatusComponent } from './add-edit-enquiry-status.component';

describe('AddEditEnquiryStatusComponent', () => {
  let component: AddEditEnquiryStatusComponent;
  let fixture: ComponentFixture<AddEditEnquiryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEnquiryStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEnquiryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
