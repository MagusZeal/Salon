import { TestBed } from '@angular/core/testing';

import { ModalEditarCobrosService } from './modal-editar-cobros.service';

describe('ModalEditarCobrosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalEditarCobrosService = TestBed.get(ModalEditarCobrosService);
    expect(service).toBeTruthy();
  });
});
