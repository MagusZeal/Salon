import { TestBed } from '@angular/core/testing';

import { ModalPagarService } from './modal-pagar.service';

describe('ModalPagarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalPagarService = TestBed.get(ModalPagarService);
    expect(service).toBeTruthy();
  });
});
