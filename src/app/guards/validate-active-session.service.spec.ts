import { TestBed } from '@angular/core/testing';

import { ValidateActiveSessionService } from './validate-active-session.service';

describe('ValidateActiveSessionService', () => {
  let service: ValidateActiveSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateActiveSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
