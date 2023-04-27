import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryWorklistComponent } from './enquiry-worklist.component';

describe('EnquiryWorklistComponent', () => {
  let component: EnquiryWorklistComponent;
  let fixture: ComponentFixture<EnquiryWorklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnquiryWorklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnquiryWorklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
