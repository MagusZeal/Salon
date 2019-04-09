import { TestBed } from '@angular/core/testing';

import { TotalesService } from './totales.service';

describe('TotalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalesService = TestBed.get(TotalesService);
    expect(service).toBeTruthy();
  });
});
