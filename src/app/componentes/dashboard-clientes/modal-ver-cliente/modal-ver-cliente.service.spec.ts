import { TestBed } from '@angular/core/testing';

import { ModalVerClienteService } from './modal-ver-cliente.service';

describe('ModalVerClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalVerClienteService = TestBed.get(ModalVerClienteService);
    expect(service).toBeTruthy();
  });
});
