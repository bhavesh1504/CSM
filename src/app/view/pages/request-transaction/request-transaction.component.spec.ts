import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTransactionComponent } from './request-transaction.component';

describe('RequestTransactionComponent', () => {
  let component: RequestTransactionComponent;
  let fixture: ComponentFixture<RequestTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
