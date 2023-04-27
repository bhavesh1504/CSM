import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditManualAssignmentComponent } from './add-edit-manual-assignment.component';

describe('AddEditManualAssignmentComponent', () => {
  let component: AddEditManualAssignmentComponent;
  let fixture: ComponentFixture<AddEditManualAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditManualAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditManualAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
