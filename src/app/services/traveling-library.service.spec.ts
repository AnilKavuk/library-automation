import { TestBed } from '@angular/core/testing';

import { TravelingLibraryService } from './traveling-library.service';

describe('TravelingLibraryService', () => {
  let service: TravelingLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelingLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
