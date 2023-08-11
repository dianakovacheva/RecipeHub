import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { Comment } from "src/app/models/Comment";
import * as moment from "moment";

@Component({
  selector: "app-comment-card",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RecipeDetailsComponent,
    MatChipsModule,
  ],
  templateUrl: "./comment-card.component.html",
  styleUrls: ["./comment-card.component.css"],
})
export class CommentCardComponent {
  @Input() comment: Comment | undefined;
  @Input() ownComment: boolean | undefined;
  commentSince: string | undefined;

  constructor() {}
  getCommentSince(createdAt: string | undefined): string {
    if (!createdAt) {
      return "";
    }
    return moment(createdAt).fromNow();
  }
}
