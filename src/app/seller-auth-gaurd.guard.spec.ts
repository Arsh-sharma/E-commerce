import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerAuthGaurdGuard } from './seller-auth-gaurd.guard';

describe('sellerAuthGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerAuthGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
