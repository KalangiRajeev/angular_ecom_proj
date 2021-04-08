import { TestBed } from '@angular/core/testing';

import { ProductsFirstGuard } from './products.gaurd.service';

describe('ProductsFirstGuard', () => {
  let service: ProductsFirstGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsFirstGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
