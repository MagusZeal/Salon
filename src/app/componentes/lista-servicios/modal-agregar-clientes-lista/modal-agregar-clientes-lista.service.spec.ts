import { TestBed } from '@angular/core/testing';

import { ModalAgregarClientesListaService } from './modal-agregar-clientes-lista.service';

describe('ModalAgregarClientesListaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalAgregarClientesListaService = TestBed.get(ModalAgregarClientesListaService);
    expect(service).toBeTruthy();
  });
});
