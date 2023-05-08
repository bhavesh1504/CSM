import { TestBed } from '@angular/core/testing';

import { RequestTransactionsService } from './request-transactions.service';

describe('RequestTransactionsService', () => {
  let service: RequestTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
