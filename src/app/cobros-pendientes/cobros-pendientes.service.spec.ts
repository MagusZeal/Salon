import { TestBed } from '@angular/core/testing';

import { CobrosPendientesService } from './cobros-pendientes.service';

describe('CobrosPendientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CobrosPendientesService = TestBed.get(CobrosPendientesService);
    expect(service).toBeTruthy();
  });
});
