import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequestTypeComponent } from './add-edit-request-type.component';

describe('AddEditRequestTypeComponent', () => {
  let component: AddEditRequestTypeComponent;
  let fixture: ComponentFixture<AddEditRequestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequestTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
