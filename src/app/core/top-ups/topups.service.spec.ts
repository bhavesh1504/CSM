import { TestBed } from '@angular/core/testing';

import { TopupsService } from './topups.service';

describe('TopupsService', () => {
  let service: TopupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
