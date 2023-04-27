import { TestBed } from '@angular/core/testing';

import { LoanMasterService } from './loan-master.service';

describe('LoanMasterService', () => {
  let service: LoanMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
