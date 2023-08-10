import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Recipe } from "../models/Recipe";
import { UserService } from "../user/user.service";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { Comment } from "../models/Comment";

const backendURL = environment.backendURL;

type cookingStep = {
  number: number;
  step: string;
};

type analyzedInstructions = {
  steps: cookingStep[];
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
  constructor(private http: HttpClient, private userService: UserService) {}

  private userIsOwner$$ = new BehaviorSubject<boolean | undefined>(undefined);
  public userIsOwner$ = this.userIsOwner$$.asObservable();

  // Convert Ingredients to Array
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

    // Create an array of objects with the steps
    const returnObject: analyzedInstructions[] = [{ steps: [] }];

    for (const [i, step] of stepsArr.entries()) {
      returnObject[0].steps.push({ number: i + 1, step: step });
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
    return this.http
      .post<Recipe>(
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
      )
      .pipe(tap(() => this.userService.getProfile()));
  }

  // Get All Recipes
  getAllRecipes() {
    https: return this.http.get<Recipe[]>(`${backendURL}/recipes`);
  }

  // Get Recipe by Id
  getRecipeById(recipeId: string) {
    https: return this.http
      .get<Recipe>(`${backendURL}/recipes/details/${recipeId}`)
      .pipe(
        tap((recipe) =>
          this.userIsOwner$$.next(
            recipe?.author?._id === this.userService.user?._id
          )
        ),
        catchError((err) => {
          this.userIsOwner$$.next(false);
          return throwError(() => err);
        })
      );
  }

  // Change UserIsOwner
  updateUserIsOwner(recipeId: string): void {
    let isOwner = false;
    this.userService.getProfile();
    this.userService.user?.userRecipesList.forEach((recipe) => {
      if (recipe === recipeId) {
        isOwner = true;
      }
    });
    this.userIsOwner$$.next(isOwner);
  }

  convertRecipeSteps(steps: []) {
    const convertedSteps: string = steps
      .map((step: { step: string }) => step.step)
      .join("\n");
    return convertedSteps;
  }

  convertRecipeIngredients(ingredients: []) {
    const convertedIngredients: string = ingredients
      .map(
        (ingredient: {
          name: string;
          measures: { metric: { amount: number; unitShort: string } };
        }) =>
          `${ingredient.measures.metric.amount} > ${ingredient.measures.metric.unitShort} > ${ingredient.name}`
      )
      .join("\n");
    return convertedIngredients;
  }

  // Edit Recipe
  editRecipe(
    recipeId: string,
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
    htts: return this.http
      .put<Recipe>(
        `${backendURL}/recipes/details/${recipeId}/edit`,
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
      )
      .pipe(tap(() => this.userService.getProfile()));
  }

  // Delete Recipe
  deleteRecipe(recipeId: string) {
    https: return this.http
      .delete<Recipe>(`${backendURL}/recipes/details/${recipeId}/delete`, {
        withCredentials: true,
      })
      .pipe(tap(() => this.userService.getProfile()));
  }

  // Save Recipe
  saveRecipe(recipeId: string) {
    https: return this.http
      .put<Recipe>(
        `${backendURL}/recipes/details/${recipeId}/save`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(tap(() => this.userService.getProfile()));
  }

  // Remove Saved Recipe
  removeSavedRecipe(recipeId: string) {
    https: return this.http
      .delete<Recipe>(
        `${backendURL}/recipes/details/${recipeId}/remove-saved`,
        { withCredentials: true }
      )
      .pipe(tap(() => this.userService.getProfile()));
  }

  // Delete Recipe
  deleteRecipe(recipeId: string) {
    https: return this.http
      .delete<Recipe>(`${backendURL}/recipes/details/${recipeId}/delete`, {
        withCredentials: true,
      })
      .pipe(tap(() => this.userService.getProfile()));
  }
}
