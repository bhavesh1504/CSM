import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdialogComponent } from './viewdialog.component';

describe('ViewdialogComponent', () => {
  let component: ViewdialogComponent;
  let fixture: ComponentFixture<ViewdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
