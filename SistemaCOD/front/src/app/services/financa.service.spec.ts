import { TestBed } from '@angular/core/testing';

import { FinancaService } from './financa.service';

describe('FinancaService', () => {
  let service: FinancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
