import { Component, Inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";

import { SnackBarService } from "../../shared/snack-bar-notification/snack-bar.service";
import { RecipeService } from "../recipe.service";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { UserService } from "src/app/user/user.service";

export interface DialogData {
  commentId: string;
  recipeId: string;
}

@Component({
  selector: "app-delete-comment",
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  templateUrl: "./delete-comment.component.html",
  styleUrls: ["./delete-comment.component.css"],
})
export class DeleteCommentComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCommentComponent>,
    private recipeService: RecipeService,
    private snackBar: SnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancle(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.recipeService
      .deleteRecipeComment(this.data.commentId, this.data.recipeId)
      .subscribe({
        next: () => {
          this.snackBar.notifySuccess("Comment deleted successfully!");
        },
        error: (error) => {
          this.snackBar.notifyError(error.error.message);
        },
      });
  }
}
