import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeadSourceComponent } from './add-edit-lead-source.component';

describe('AddEditLeadSourceComponent', () => {
  let component: AddEditLeadSourceComponent;
  let fixture: ComponentFixture<AddEditLeadSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeadSourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLeadSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
