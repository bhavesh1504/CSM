import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCitiesComponent } from './add-edit-cities.component';

describe('AddEditCitiesComponent', () => {
  let component: AddEditCitiesComponent;
  let fixture: ComponentFixture<AddEditCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
