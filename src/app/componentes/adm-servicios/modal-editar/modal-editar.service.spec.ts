import { TestBed } from '@angular/core/testing';

import { ModalEditarService } from './modal-editar.service';

describe('ModalEditarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalEditarService = TestBed.get(ModalEditarService);
    expect(service).toBeTruthy();
  });
});
