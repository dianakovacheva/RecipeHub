import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import * as moment from "moment";
import { NgFor } from "@angular/common";

import { Comment } from "src/app/models/Comment";
import { DeleteCommentComponent } from "src/app/recipe/delete-comment/delete-comment.component";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "../../user.service";
import { ProfileComponent } from "../profile.component";

@Component({
  selector: "app-profile-comments-list",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    RouterModule,
  ],
  templateUrl: "./profile-comments-list.component.html",
  styleUrls: ["./profile-comments-list.component.css"],
})
export class ProfileCommentsListComponent {
  @Input() comment: Comment | undefined;
  @Input() recipeId: string | undefined;
  @Input() commentsArray: Comment[] | undefined;
  commentSince: string | undefined;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private profileComponent: ProfileComponent
  ) {}

  getCommentSince(createdAt: string | undefined): string {
    if (!createdAt) {
      return "";
    }
    return moment(createdAt).fromNow();
  }

  // Delete Comment
  openDeleteCommentDialog(comment: Comment, $event: any): void {
    $event.stopPropagation();
    this.dialog
      .open(DeleteCommentComponent, {
        data: {
          commentId: comment!._id,
          recipeId: comment.commentedRecipe._id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.profileComponent.getUserComments();
        this.userService.getProfile();
      });
  }
}
