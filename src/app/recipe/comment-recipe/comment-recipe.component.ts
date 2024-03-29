import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { SnackBarService } from "../../shared/snack-bar-notification/snack-bar.service";
import { Recipe } from "src/app/models/Recipe";
import { Comment } from "src/app/models/Comment";
import { DeleteRecipeComponent } from "../delete-recipe/delete-recipe.component";
import { MatDialogModule } from "@angular/material/dialog";
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserService } from "src/app/user/user.service";
import { UserId } from "src/app/models/UserId";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";

export interface DialogData {
  recipe: Recipe;
  comment: Comment;
  commentAuthor: UserId;
  redirectToRecipes: boolean;
}

@Component({
  selector: "app-comment-recipe",
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    DeleteRecipeComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./comment-recipe.component.html",
  styleUrls: ["./comment-recipe.component.css"],
})
export class CommentRecipeComponent {
  @Input() recipeId: string | undefined;

  constructor(
    // public dialogRef: MatDialogRef<CommentRecipeComponent>,
    private recipeService: RecipeService,
    private snackBar: SnackBarService,
    private userService: UserService,
    private recipeDetailsComponent: RecipeDetailsComponent // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  commentContent = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(500),
  ]);

  // Check Error Functions
  getErrorMessageCommentContent() {
    const commentInput = this.commentContent;

    if (commentInput!.hasError("required")) {
      return "You must enter a value.";
    }

    if (commentInput!.hasError("minlength")) {
      return "Comment must be at least 2 characters long.";
    }

    return commentInput!.hasError("maxlength")
      ? "Comment must be less than 500 characters long."
      : "";
  }

  // onCancle(): void {
  //   this.dialogRef.close();
  // }

  onConfirm($event: { preventDefault: () => void }): void {
    $event.preventDefault();
    this.recipeService
      .commentRecipe(this.recipeId!, this.commentContent.value ?? "")
      .subscribe({
        next: () => {
          this.markUntouched();
          this.recipeDetailsComponent.getRecipeById();
          this.recipeDetailsComponent.getRecipeComments();
          this.userService.getProfile();
          this.snackBar.notifySuccess("Comment added successfully!");
        },
        error: (err) => this.snackBar.notifyError(err.error.message),
      });
  }

  markUntouched() {
    this.commentContent.reset();
    this.commentContent.markAsUntouched();
  }
}
