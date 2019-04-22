import { TestBed } from '@angular/core/testing';

import { AsignarServiciosService } from './asignar-servicios.service';

describe('AsignarServiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsignarServiciosService = TestBed.get(AsignarServiciosService);
    expect(service).toBeTruthy();
  });
});
