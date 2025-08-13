import { TestBed } from '@angular/core/testing';

import { ChnagePassRequestService } from './chnage-pass-request.service';

describe('ChnagePassRequestService', () => {
  let service: ChnagePassRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChnagePassRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
