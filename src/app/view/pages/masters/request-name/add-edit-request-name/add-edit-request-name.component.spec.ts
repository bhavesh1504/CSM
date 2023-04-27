import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRequestNameComponent } from './add-edit-request-name.component';

describe('AddEditRequestNameComponent', () => {
  let component: AddEditRequestNameComponent;
  let fixture: ComponentFixture<AddEditRequestNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRequestNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRequestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
