import { TestBed } from '@angular/core/testing';

import { TableSortingExampleService } from './table-sorting-example.service';

describe('TableSortingExampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableSortingExampleService = TestBed.get(TableSortingExampleService);
    expect(service).toBeTruthy();
  });
});
