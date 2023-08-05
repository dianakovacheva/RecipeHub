import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/user.service";
import { SnackBarService } from "../snack-bar-notification/snack-bar.service";

@Injectable({ providedIn: "root" })
export class LoggedInGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: SnackBarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(["/auth/login"], {
        queryParams: { redirectUrl: state.url },
      });
      this.snackBar.notifyInfo("Please login to continue.");
      return false;
    }
    return true;
  }
}
