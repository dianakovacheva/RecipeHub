import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, take, map } from "rxjs";
import { RecipeService } from "../../recipe/recipe.service";
import { SnackBarService } from "../snack-bar-notification/snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class RecipeOwnerGuard implements CanActivate {
  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private snackBar: SnackBarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    return this.recipeService.userIsOwner$.pipe(
      take(1),
      map((isOwner) => {
        if (!isOwner) {
          const { recipeId } = route.params;
          this.router.navigate([`/recipe-details/${recipeId}`]);
          this.snackBar.notifyInfo("You are not the owner of this recipe.");
          return false;
        }
        return true;
      })
    );
  }
}
