import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNameComponent } from './request-name.component';

describe('RequestNameComponent', () => {
  let component: RequestNameComponent;
  let fixture: ComponentFixture<RequestNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestNameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
