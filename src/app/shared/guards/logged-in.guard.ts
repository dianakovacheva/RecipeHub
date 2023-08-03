import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { UserId } from "src/app/models/UserId";

export const loggedInGuard: CanActivate = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return isLoggedIn();
};
