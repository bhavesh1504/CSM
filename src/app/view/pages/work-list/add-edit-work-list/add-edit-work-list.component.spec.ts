import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkListComponent } from './add-edit-work-list.component';

describe('AddEditWorkListComponent', () => {
  let component: AddEditWorkListComponent;
  let fixture: ComponentFixture<AddEditWorkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
