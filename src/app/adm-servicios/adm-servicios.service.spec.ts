import { TestBed } from '@angular/core/testing';

import { AdmServiciosService } from './adm-servicios.service';

describe('AdmServiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmServiciosService = TestBed.get(AdmServiciosService);
    expect(service).toBeTruthy();
  });
});
