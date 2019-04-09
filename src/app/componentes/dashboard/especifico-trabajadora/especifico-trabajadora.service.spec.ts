import { TestBed } from '@angular/core/testing';

import { EspecificoTrabajadoraService } from './especifico-trabajadora.service';

describe('EspecificoTrabajadoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EspecificoTrabajadoraService = TestBed.get(EspecificoTrabajadoraService);
    expect(service).toBeTruthy();
  });
});
