import { TestBed } from '@angular/core/testing';

import { DashboardClientesService } from './dashboard-clientes.service';

describe('DashboardClientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardClientesService = TestBed.get(DashboardClientesService);
    expect(service).toBeTruthy();
  });
});
