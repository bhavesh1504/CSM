import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidpopupDailogComponent } from './paidpopup-dailog.component';

describe('PaidpopupDailogComponent', () => {
  let component: PaidpopupDailogComponent;
  let fixture: ComponentFixture<PaidpopupDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidpopupDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidpopupDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
