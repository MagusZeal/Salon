import { TestBed } from '@angular/core/testing';

import { ModalAgregarClienteService } from './modal-agregar-cliente.service';

describe('ModalAgregarClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalAgregarClienteService = TestBed.get(ModalAgregarClienteService);
    expect(service).toBeTruthy();
  });
});
