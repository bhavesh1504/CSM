import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCountriesComponent } from './add-edit-countries.component';

describe('AddEditCountriesComponent', () => {
  let component: AddEditCountriesComponent;
  let fixture: ComponentFixture<AddEditCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
