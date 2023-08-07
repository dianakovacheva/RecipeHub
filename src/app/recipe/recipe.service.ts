import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Recipe } from "../models/Recipe";
import { UserService } from "../user/user.service";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

const backendURL = environment.backendURL;

// Define the structure of the type cooking step data returned from the API
type cookingStep = {
  number: number;
  step: string;
};

// Define the structure of the type analyzedInstructions data returned from the API
type analyzedInstructions = {
  steps: cookingStep[];
};

// Define the structure of the type measure data returned from the API
type Measure = {
  amount: number;
  unitShort: string;
};

// Define the structure of the type extendedIngredient data returned from the API
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

    // Loop through the ingredients array and split each ingredient into its amount, unit and name by ">"
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

  // Convert Steps to Array of Objects
  convertStepstoArray(steps: string) {
    let stepsArr = steps.split("\n");
    stepsArr = stepsArr.filter((step) => step).map((step) => step.trim());
    // Create an array of objects with the structure of the type analyzedInstructions
    const returnObject: analyzedInstructions[] = [{ steps: [] }];

    for (const [i, step] of stepsArr.entries()) {
      returnObject[0].steps.push({ number: i + 1, step: step });
    }
    // Return the array of objects as a string to fit the API's requirenments
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

  // Get All Recipes
  getAllRecipes() {
    https: return this.http.get<Recipe[]>(`${backendURL}/recipes`);
  }

  // .subscribe((recipe: Recipe) => {
  //   this.userIsOwner = recipe?.author?._id === this.userService.user?._id;
  // });

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

  // change UserIsOwner
  updateUserIsOwner(recipeId: string): void {
    let isOwner = false;
    this.userService.user?.userRecipesList.forEach((recipe) => {
      if (recipe === recipeId) {
        isOwner = true;
      }
    });
    this.userIsOwner$$.next(isOwner);
  }

  // Convert the recipe steps to the correct format required by the API
  convertRecipeSteps(steps: []) {
    const convertedSteps: string = steps
      .map((step: { step: string }) => step.step)
      .join("\n");
    return convertedSteps;
  }

  // Convert the recipe ingredients to the correct format required by the API
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
    htts: return this.http.put<Recipe>(
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
    );
  }

  // Delete Recipe
  deleteRecipe(recipeId: string) {
    https: return this.http.delete<Recipe>(
      `${backendURL}/recipes/details/${recipeId}/delete`,
      { withCredentials: true }
    );
  }
}
