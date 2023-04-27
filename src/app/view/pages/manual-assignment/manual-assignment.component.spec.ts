import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualAssignmentComponent } from './manual-assignment.component';

describe('ManualAssignmentComponent', () => {
  let component: ManualAssignmentComponent;
  let fixture: ComponentFixture<ManualAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
