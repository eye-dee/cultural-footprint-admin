import { TestBed } from '@angular/core/testing';

import { RawRecordService } from './raw-record.service';

describe('RawRecordService', () => {
  let service: RawRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RawRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
