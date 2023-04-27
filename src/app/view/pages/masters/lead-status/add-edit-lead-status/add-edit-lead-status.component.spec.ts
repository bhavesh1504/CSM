import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeadStatusComponent } from './add-edit-lead-status.component';

describe('AddEditLeadStatusComponent', () => {
  let component: AddEditLeadStatusComponent;
  let fixture: ComponentFixture<AddEditLeadStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeadStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLeadStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
