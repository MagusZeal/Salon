import { TestBed } from '@angular/core/testing';

import { BoletaReservaDiaService } from './boleta-reserva-dia.service';

describe('BoletaReservaDiaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoletaReservaDiaService = TestBed.get(BoletaReservaDiaService);
    expect(service).toBeTruthy();
  });
});
