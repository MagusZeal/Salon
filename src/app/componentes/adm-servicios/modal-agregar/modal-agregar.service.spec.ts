import { TestBed } from '@angular/core/testing';

import { ModalAgregarService } from './modal-agregar.service';

describe('ModalAgregarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalAgregarService = TestBed.get(ModalAgregarService);
    expect(service).toBeTruthy();
  });
});
