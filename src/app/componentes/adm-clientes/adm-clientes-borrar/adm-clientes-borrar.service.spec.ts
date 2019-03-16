import { TestBed } from '@angular/core/testing';

import { AdmClientesBorrarService } from './adm-clientes-borrar.service';

describe('AdmClientesBorrarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmClientesBorrarService = TestBed.get(AdmClientesBorrarService);
    expect(service).toBeTruthy();
  });
});
