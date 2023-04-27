import { TestBed } from '@angular/core/testing';

import { RequestNameService } from './request-name.service';

describe('RequestNameService', () => {
  let service: RequestNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
