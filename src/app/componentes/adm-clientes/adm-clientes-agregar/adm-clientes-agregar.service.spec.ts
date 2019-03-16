import { TestBed } from '@angular/core/testing';

import { AdmClientesAgregarService } from './adm-clientes-agregar.service';

describe('AdmClientesAgregarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmClientesAgregarService = TestBed.get(AdmClientesAgregarService);
    expect(service).toBeTruthy();
  });
});
