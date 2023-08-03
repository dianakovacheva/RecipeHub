import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Recipe } from "../models/Recipe";

@Injectable({
  providedIn: "root",
})
export class SpoonacularAPIService {
  constructor(private http: HttpClient) {}

  // Get Random Recipes
  getRecipes() {
    const { spoonacularAPI_URL } = environment;
    https: return this.http.get<Recipe[]>(
      `${spoonacularAPI_URL}/random?number=1&apiKey=89471e151880422ea473ce41b59250e7`
    );
  }

  // Get Recipe by Id
  getRecipeById(recipeId: string) {
    const { spoonacularAPI_URL } = environment;
    return this.http.get<Recipe>(`${spoonacularAPI_URL}/${recipeId}`);
  }

  // Create Recipe
  createRecipe(
    title: string,
    preparationMinutes: number,
    cookingMinutes: number,
    servings: number,
    pricePerServing: number,
    imageURL: string,
    summary: string,
    dishTypes: string[],
    extendedIngredients: any,
    analyzedInstructions: any,
    createdAt: string
  ) {
    return this.http.post<Recipe>("/api/create-recipe", {
      title,
      preparationMinutes,
      cookingMinutes,
      servings,
      pricePerServing,
      imageURL,
      summary,
      dishTypes,
      extendedIngredients,
      analyzedInstructions,
      createdAt,
    });
  }
}
