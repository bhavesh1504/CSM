import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadMaintanceComponent } from './lead-maintance.component';

describe('LeadMaintanceComponent', () => {
  let component: LeadMaintanceComponent;
  let fixture: ComponentFixture<LeadMaintanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadMaintanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadMaintanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
