import { TestBed } from '@angular/core/testing';

import { MessageSharedService } from './messageShared.service';

describe('MessageService', () => {
  let service: MessageSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
