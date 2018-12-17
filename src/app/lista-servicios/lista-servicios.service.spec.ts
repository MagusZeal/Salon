import { TestBed } from '@angular/core/testing';

import { ListaServiciosService } from './lista-servicios.service';

describe('ListaServiciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaServiciosService = TestBed.get(ListaServiciosService);
    expect(service).toBeTruthy();
  });
});
