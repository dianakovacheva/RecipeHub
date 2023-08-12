import { Component, Input } from "@angular/core";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { Comment } from "src/app/models/Comment";
import * as moment from "moment";

import { DeleteCommentComponent } from "../delete-comment/delete-comment.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
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
    MatDialogModule,
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
    private dialog: MatDialog,
    private recipeDetailsComponent: RecipeDetailsComponent,
    private userService: UserService
  ) {}

  getCommentSince(createdAt: string | undefined): string {
    if (!createdAt) {
      return "";
    }
    return moment(createdAt).fromNow();
  }

  // Delete Comment
  openDeleteCommentDialog(): void {
    this.dialog
      .open(DeleteCommentComponent, {
        data: { commentId: this.comment!._id, recipeId: this.recipeId! },
      })
      .afterClosed()
      .subscribe(() => {
        this.recipeDetailsComponent.getRecipeById();
        this.recipeDetailsComponent.getRecipeComments();
        this.userService.getProfile();
      });
  }
}
