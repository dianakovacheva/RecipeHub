import { UserId } from "./UserId";
import { Recipe } from "./Recipe";

export interface Comment {
  text: string;
  commentOwner: UserId;
  commentedRecipe: Recipe;
}
