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
    const { recipeId } = route.params;
    this.recipeService.updateUserIsOwner(recipeId);
    return this.recipeService.userIsOwner$.pipe(
      take(1),
      map((isOwner) => {
        if (!isOwner) {
          this.router.navigate([`recipes/details/${recipeId}`]);
          this.snackBar.notifyInfo("You are not the owner of this recipe.");
          return false;
        }
        return true;
      })
    );
  }
}
