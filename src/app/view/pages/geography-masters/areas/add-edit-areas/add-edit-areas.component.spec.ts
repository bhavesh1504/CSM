import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAreasComponent } from './add-edit-areas.component';

describe('AddEditAreasComponent', () => {
  let component: AddEditAreasComponent;
  let fixture: ComponentFixture<AddEditAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
