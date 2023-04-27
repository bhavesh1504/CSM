import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStatesComponent } from './add-edit-states.component';

describe('AddEditStatesComponent', () => {
  let component: AddEditStatesComponent;
  let fixture: ComponentFixture<AddEditStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
