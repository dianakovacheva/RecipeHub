import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Recipe } from "../models/Recipe";

const backendURL = environment.backendURL;

type AnalyzedStep = {
  number: number;
  step: string;
};

type Measure = {
  amount: number;
  unitShort: string;
};

type ExtendedIngredient = {
  name: string;
  measures: {
    metric: Measure;
  };
};

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  convertIngredientsToArray(ingredients: string): ExtendedIngredient[] {
    const ingredientsArr = ingredients.split("\n");

    const returnObject: ExtendedIngredient[] = [];

    for (const ingredient of ingredientsArr) {
      const [amount, unitShort, name] = ingredient.split(" > ");
      const measure: Measure = {
        amount: parseFloat(amount),
        unitShort: unitShort.trim(),
      };
      const extendedIngredient: ExtendedIngredient = {
        name: name.trim(),
        measures: { metric: measure },
      };
      returnObject.push(extendedIngredient);
    }

    return returnObject;
  }

  convertStepstoArray(steps: string) {
    let stepsArr = steps.split("\n");
    stepsArr = stepsArr.filter((step) => step).map((step) => step.trim());

    const returnObject: AnalyzedStep[] = [];

    for (const [i, step] of stepsArr.entries()) {
      returnObject.push({ number: i + 1, step: step });
    }
    return JSON.stringify(returnObject);
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
    analyzedInstructions: any
  ) {
    let convertedSteps = this.convertStepstoArray(analyzedInstructions);
    let convertedIngredients = JSON.stringify(
      this.convertIngredientsToArray(extendedIngredients)
    );
    return this.http.post<Recipe>(
      `${backendURL}/recipes/create-recipe`,
      {
        title,
        preparationMinutes,
        cookingMinutes,
        servings,
        pricePerServing,
        imageURL,
        summary,
        dishTypes,
        extendedIngredients: convertedIngredients,
        analyzedInstructions: convertedSteps,
      },
      {
        withCredentials: true,
      }
    );
  }
}
