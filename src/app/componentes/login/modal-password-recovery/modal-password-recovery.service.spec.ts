import { TestBed } from '@angular/core/testing';

import { ModalPasswordRecoveryService } from './modal-password-recovery.service';

describe('ModalPasswordRecoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalPasswordRecoveryService = TestBed.get(ModalPasswordRecoveryService);
    expect(service).toBeTruthy();
  });
});
