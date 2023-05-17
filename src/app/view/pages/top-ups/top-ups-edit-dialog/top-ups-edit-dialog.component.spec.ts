import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpsEditDialogComponent } from './top-ups-edit-dialog.component';

describe('TopUpsEditDialogComponent', () => {
  let component: TopUpsEditDialogComponent;
  let fixture: ComponentFixture<TopUpsEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpsEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUpsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
