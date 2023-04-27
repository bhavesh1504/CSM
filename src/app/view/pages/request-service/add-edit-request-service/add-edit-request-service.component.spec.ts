import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequestServiceComponent } from './add-edit-request-service.component';

describe('AddEditRequestServiceComponent', () => {
  let component: AddEditRequestServiceComponent;
  let fixture: ComponentFixture<AddEditRequestServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequestServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequestServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
