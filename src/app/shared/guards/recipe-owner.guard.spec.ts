import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { recipeOwnerGuard } from './recipe-owner.guard';

describe('recipeOwnerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recipeOwnerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
