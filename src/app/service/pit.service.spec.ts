import { TestBed } from '@angular/core/testing';

import { PitService } from './pit.service';

describe('PitService', () => {
  let service: PitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
