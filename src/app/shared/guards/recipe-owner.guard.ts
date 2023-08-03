import { CanActivateFn } from '@angular/router';

export const recipeOwnerGuard: CanActivateFn = (route, state) => {
  return true;
};
