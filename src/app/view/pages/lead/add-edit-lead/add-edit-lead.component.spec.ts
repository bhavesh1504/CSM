import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeadComponent } from './add-edit-lead.component';

describe('AddEditLeadComponent', () => {
  let component: AddEditLeadComponent;
  let fixture: ComponentFixture<AddEditLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
