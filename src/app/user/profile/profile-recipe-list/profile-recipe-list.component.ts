import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { Recipe } from "src/app/models/Recipe";
import { Comment } from "src/app/models/Comment";
import { DeleteRecipeComponent } from "src/app/recipe/delete-recipe/delete-recipe.component";
import { MatButtonModule } from "@angular/material/button";
import { NgIf, NgFor } from "@angular/common";
import { ProfileComponent } from "../profile.component";
import { RecipeService } from "src/app/recipe/recipe.service";
import { SnackBarService } from "src/app/shared/snack-bar-notification/snack-bar.service";
// import { CommentRecipeComponent } from "src/app/recipe/comment-recipe/comment-recipe.component";

@Component({
  selector: "app-profile-recipe-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    NgIf,
    NgFor,
  ],
  templateUrl: "./profile-recipe-list.component.html",
  styleUrls: ["./profile-recipe-list.component.css"],
})
export class ProfileRecipeListComponent {
  @Input() recipesArray: Recipe[] | undefined;
  @Input() commentsArray: Comment[] | undefined;
  @Input() listType:
    | "userRecipes"
    | "userSavedRecipes"
    // | "userCommentsList"
    | undefined;

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private profileComponent: ProfileComponent,
    // private commentComponent: CommentRecipeComponent,
    private snackBar: SnackBarService
  ) {}

  // Delete Recipe Dialog
  openDeleteDialog(recipe: Recipe, $event: any): void {
    $event.stopPropagation();
    this.dialog
      .open(DeleteRecipeComponent, {
        data: { recipe: recipe, redirectToRecipes: false },
      })
      .afterClosed()
      .subscribe(() => {
        this.profileComponent.getUserRecipes();
      });
  }

  // Remove Saved Recipe
  handelRemoveSavedRecipe(recipeId: string, $event: any): void {
    $event.stopPropagation();
    this.recipeService.removeSavedRecipe(recipeId).subscribe(() => {
      this.profileComponent.getUserSavedRecipes();
      this.snackBar.notifySuccess("Recipe removed successfully!");
    });
  }

  // Comment Recipe Dialog
  // openCommentDialog(comment: Comment, $event: any): void {
  //   $event.stopPropagation();
  //   this.dialog
  //     .open(CommentRecipeComponent, {
  //       data: {
  //         comment: comment,
  //         redirectToRecipes: false,
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe(() => {
  //       this.profileComponent.getUserComments();
  //     });
  // }
}
