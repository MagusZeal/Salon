import { TestBed } from '@angular/core/testing';

import { TotalesClientesService } from './totales-clientes.service';

describe('TotalesClientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalesClientesService = TestBed.get(TotalesClientesService);
    expect(service).toBeTruthy();
  });
});
