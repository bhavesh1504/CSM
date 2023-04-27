import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeadMaintanceComponent } from './add-edit-lead-maintance.component';

describe('AddEditLeadMaintanceComponent', () => {
  let component: AddEditLeadMaintanceComponent;
  let fixture: ComponentFixture<AddEditLeadMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeadMaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLeadMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
