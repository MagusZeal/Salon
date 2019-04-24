import { TestBed } from '@angular/core/testing';

import { BoletaReservasFuturasService } from './boleta-reservas-futuras.service';

describe('BoletaReservasFuturasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoletaReservasFuturasService = TestBed.get(BoletaReservasFuturasService);
    expect(service).toBeTruthy();
  });
});
