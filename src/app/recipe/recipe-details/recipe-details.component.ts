import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgIf, NgFor } from "@angular/common";

import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { RouterModule, Router } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { Recipe } from "../../models/Recipe";
import { RecipeService } from "../recipe.service";
import { UserId } from "../../models/UserId";
import { DeleteRecipeComponent } from "../delete-recipe/delete-recipe.component";
import { SnackBarService } from "src/app/shared/snack-bar-notification/snack-bar.service";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"],
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    CommonModule,
    NgIf,
    NgFor,
    MatDividerModule,
    RouterModule,
    MatDialogModule,
  ],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  user: UserId | undefined;
  userId: UserId["_id"] | undefined;
  userIsOwner: boolean | undefined;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }
  recipeId = this.activatedRoute.snapshot.params["recipeId"];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRecipeById();
    this.recipeService.userIsOwner$.subscribe((isOwner) => {
      this.userIsOwner = isOwner;
    });
  }

  // Get Recipe by Id
  getRecipeById(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((foundRecipe) => {
      this.recipe = foundRecipe;
    });
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteRecipeComponent, {
      data: { recipe: this.recipe, redirectToRecipes: true },
    });
  }
}
