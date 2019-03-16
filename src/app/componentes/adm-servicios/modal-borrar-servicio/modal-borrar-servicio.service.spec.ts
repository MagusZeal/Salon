import { TestBed } from '@angular/core/testing';

import { ModalBorrarServicioService } from './modal-borrar-servicio.service';

describe('ModalBorrarServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalBorrarServicioService = TestBed.get(ModalBorrarServicioService);
    expect(service).toBeTruthy();
  });
});
