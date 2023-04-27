import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRejectReasonComponent } from './add-edit-reject-reason.component';

describe('AddEditRejectReasonComponent', () => {
  let component: AddEditRejectReasonComponent;
  let fixture: ComponentFixture<AddEditRejectReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRejectReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRejectReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
