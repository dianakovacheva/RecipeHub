import { UserId } from "./UserId";
import { Recipe } from "./Recipe";

export interface Comment {
  _id: string;
  comment: string;
  commentAuthor: UserId;
  commentedRecipe: Recipe;
  created_at: string;
}
