import { UserId } from "./UserId";

export interface Recipe {
  recipeApiId: string;
  _id: string;
  title: string;
  author: UserId;
  preparationMinutes: number;
  cookingMinutes: number;
  servings: number;
  pricePerServing: number;
  imageURL: string;
  summary: string;
  dishTypes: string[];
  extendedIngredients: any;
  analyzedInstructions: any;
  commentsList: string[];
  saves: string[];
  createdAt: string;
}
