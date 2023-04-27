import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditReasonMasterComponent } from './add-edit-reason-master.component';

describe('AddEditReasonMasterComponent', () => {
  let component: AddEditReasonMasterComponent;
  let fixture: ComponentFixture<AddEditReasonMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditReasonMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditReasonMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
