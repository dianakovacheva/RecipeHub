import { Component, Input, OnInit } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { Comment } from "src/app/models/Comment";
import * as moment from "moment";

import { RecipeService } from "../recipe.service";
import { SnackBarService } from "src/app/shared/snack-bar-notification/snack-bar.service";
import { Recipe } from "src/app/models/Recipe";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: "app-comment-card",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RecipeDetailsComponent,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: "./comment-card.component.html",
  styleUrls: ["./comment-card.component.css"],
})
export class CommentCardComponent {
  @Input() comment: Comment | undefined;
  @Input() ownComment: boolean | undefined;
  @Input() commentByOwner: boolean | undefined;
  @Input() recipeId: string | undefined;
  commentSince: string | undefined;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private snackBar: SnackBarService,
    private recipeDetailsComponent: RecipeDetailsComponent
  ) {}

  getCommentSince(createdAt: string | undefined): string {
    if (!createdAt) {
      return "";
    }
    return moment(createdAt).fromNow();
  }

  handleDeleteRecipeComment() {
    if (!this.comment) {
      return;
    }
    this.recipeService
      .deleteRecipeComment(this.comment._id, this.recipeId!)
      .subscribe({
        next: () => {
          this.recipeDetailsComponent.getRecipeById();
          this.recipeDetailsComponent.getRecipeComments();
          this.userService.getProfile();
          this.snackBar.notifySuccess("Comment deleted successfully!");
        },
        error: (error) => {
          this.snackBar.notifyError(error.error.message);
        },
      });
  }
}
