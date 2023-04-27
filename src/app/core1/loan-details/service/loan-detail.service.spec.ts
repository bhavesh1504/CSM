import { TestBed } from '@angular/core/testing';

import { LoanDetailService } from './loan-detail.service';

describe('LoanDetailService', () => {
  let service: LoanDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
