import { TestBed } from '@angular/core/testing';

import { Login1Service } from './login1.service';

describe('Login1Service', () => {
  let service: Login1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Login1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
