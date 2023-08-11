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
import { RouterModule } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

import { Recipe } from "../../models/Recipe";
import { RecipeService } from "../recipe.service";
import { UserId } from "../../models/UserId";
import { DeleteRecipeComponent } from "../delete-recipe/delete-recipe.component";
import { SnackBarService } from "src/app/shared/snack-bar-notification/snack-bar.service";
import { UserService } from "src/app/user/user.service";
import { CommentRecipeComponent } from "../comment-recipe/comment-recipe.component";
import { CommentCardComponent } from "../comment-card/comment-card.component";
import { Comment } from "src/app/models/Comment";
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
    CommentRecipeComponent,
    CommentCardComponent,
  ],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe | undefined;
  user: UserId | undefined;
  userId: UserId["_id"] | undefined;
  userIsOwner: boolean | undefined;
  commentsList: Comment[] | undefined;

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  recipeId = this.activatedRoute.snapshot.params["recipeId"];

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private snackBar: SnackBarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRecipeById();
    this.recipeService.userIsOwner$.subscribe((isOwner) => {
      this.userIsOwner = isOwner;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.userId = user?._id;
    });
    this.getRecipeComments();
  }

  // Scroll to Comment Section
  onClickComment() {
    let target = document.querySelector("#write-comment");
    if (target) {
      target.scrollIntoView();
    }
  }

  // Scroll to User Comments Section
  onClickUserComments() {
    let target = document.querySelector("#user-comments");
    if (target) {
      target.scrollIntoView();
    }
  }

  // Get Recipe by Id
  getRecipeById(): void {
    this.recipeService.getRecipeById(this.recipeId).subscribe((foundRecipe) => {
      this.recipe = foundRecipe;
    });
  }

  // Save Recipe
  saveRecipe(): void {
    this.recipeService.saveRecipe(this.recipeId).subscribe(() => {
      this.getRecipeById();
      this.userService.getProfile();
      this.snackBar.notifySuccess("Recipe saved successfully!");
    });
  }

  // Remove Saved Recipe
  handelRemoveSavedRecipe(recipeId: string): void {
    this.recipeService.removeSavedRecipe(recipeId).subscribe(() => {
      this.getRecipeById();
      this.userService.getProfile();
      this.snackBar.notifySuccess("Recipe removed successfully!");
    });
  }

  // Delete Recipe
  openDeleteDialog(): void {
    this.dialog.open(DeleteRecipeComponent, {
      data: { recipe: this.recipe, redirectToRecipes: true },
    });
  }

  // Get Recipe Comments
  getRecipeComments(): void {
    this.recipeService
      .getRecipeComments(this.recipeId)
      .subscribe((comments) => {
        this.commentsList = comments;
      });
  }
}
