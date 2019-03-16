import { TestBed } from '@angular/core/testing';

import { AdmClientesEditarService } from './adm-clientes-editar.service';

describe('AdmClientesEditarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmClientesEditarService = TestBed.get(AdmClientesEditarService);
    expect(service).toBeTruthy();
  });
});
