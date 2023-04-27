import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadedFilesComponent } from './view-uploaded-files.component';

describe('ViewUploadedFilesComponent', () => {
  let component: ViewUploadedFilesComponent;
  let fixture: ComponentFixture<ViewUploadedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUploadedFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUploadedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
