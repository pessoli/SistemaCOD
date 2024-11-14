import { TestBed } from '@angular/core/testing';

import { DicaFinanceiraService } from './dica-financeira.service';

describe('DicaFinanceiraService', () => {
  let service: DicaFinanceiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DicaFinanceiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
