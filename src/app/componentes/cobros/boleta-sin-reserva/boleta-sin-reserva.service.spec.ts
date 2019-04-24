import { TestBed } from '@angular/core/testing';

import { BoletaSinReservaService } from './boleta-sin-reserva.service';

describe('BoletaSinReservaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoletaSinReservaService = TestBed.get(BoletaSinReservaService);
    expect(service).toBeTruthy();
  });
});
