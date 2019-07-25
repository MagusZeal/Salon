import { TestBed } from '@angular/core/testing';

import { AdmTrabajadorasService } from './adm-trabajadoras.service';

describe('AdmTrabajadorasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmTrabajadorasService = TestBed.get(AdmTrabajadorasService);
    expect(service).toBeTruthy();
  });
});
